const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')

beforeEach(async() => {

  await User.deleteMany({})
  const user = await helper.createTestUser()

  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs){
    blog.user = user._id
    let blogObject = new Blog(blog)
    await blogObject.save()
    user.blogs = user.blogs.concat(blogObject._id)
  }
},10000)

test('correct amount of blogs are returned', async() => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
},10000)

test('id is correctly defined', async() => {
  const response = await api
    .get('/api/blogs').expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body[0]._id).not.toBeDefined()
  expect(response.body[0].id).toBeDefined()

})
describe('adding blogs',() => {

  test('adding a blog works', async() => {
    // const user = await helper.createTestUser()
    // const userForToken = {
    //   username : user.username,
    //   id: user._id
    // }
    const token = await helper.getValidToken()
    const newBlog =  {
      'title': 'new Blog Title 1',
      'author': 'new Blog Author 1',
      'url': 'new Blog Url 1',
      'likes': 50
    }
    const resp = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' , `bearer ${token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    //the following checks the content of the response is the same at the request
    expect(resp.body.title).toEqual(newBlog.title)
    expect(resp.body.author).toEqual(newBlog.author)
    expect(resp.body.url).toEqual(newBlog.url)
    expect(resp.body.likes).toEqual(newBlog.likes)

    //get the database as is
    const blogsAtEnd = await helper.blogsInDb()
    //check that it has one more blog that initially
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    //get the user after blogs was added
    const userAfter = await User.findById(resp.body.user.toString())

    //convert blogs to strings and check contains added blog
    const userAfterBlogs = userAfter.blogs.map(b => b.toString())
    expect(userAfterBlogs).toContain(resp.body.id)
  })

  test('adding a blog with no likes sets to zero', async() => {
    const token = await helper.getValidToken()
    const newBlog =  {
      'title': 'new Blog Title 1',
      'author': 'new Blog Author 1',
      'url': 'new Blog Url 1'
    }
    const resp = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' , `bearer ${token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    //the following checks the content of the response is the same at the request
    expect(resp.body.title).toEqual(newBlog.title)
    expect(resp.body.author).toEqual(newBlog.author)
    expect(resp.body.url).toEqual(newBlog.url)
    expect(resp.body.likes).toEqual(0)

    //get the database as is
    const blogsAtEnd = await helper.blogsInDb()
    //check that it has one more blog that initially
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    //get the user after blogs was added
    const userAfter = await User.findById(resp.body.user.toString())
    //convert blogs to strings and check contains added blog
    const userAfterBlogs = userAfter.blogs.map(b => b.toString())
    expect(userAfterBlogs).toContain(resp.body.id)

  })

  test('title and url missing is a bad request', async () => {
    const token = await helper.getValidToken()
    const newBlog =  {
      'author': 'new Blog Author 1',
      'likes': 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' , `bearer ${token}`)
      .expect(400)
  })
})
describe('deleting a blog',() => {

  test('succeeds for valid id', async () => {
    //get the blog we want to delete
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    //find the user for this blog and generate token
    const user = await User.findById(blogToDelete.user)
    const token = await helper.getValidTokenForUser(user)

    //call the api
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization' , `bearer ${token}`)
      .expect(204)

    //look at the blogs at the end and check there is one less and does not contain the deleted blog
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete)
    //check the user doesnt have the blogs id
    const userAfter = await User.findById(blogToDelete.user)
    expect(userAfter.blogs).not.toContain(blogToDelete.id)
  })
  test('status code 204 for id that does not exist',async () => {
    const nonExisitngId = await helper.nonExisitngId()
    const token = await helper.getValidToken()
    await api
      .delete(`/api/blogs/${nonExisitngId}`)
      .set('Authorization',`bearer ${token}`)
      .expect(204)
  })
  test('invalid token fails',async() => {
    //get the blog we want to delete
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    //make invalid token from env secret
    const invalidToken = await jwt.sign({ username:'username' }, process.env.SECRET + 'I break the Secret')
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization',`bearer ${invalidToken}`)
      .expect(401)
  })
})
describe('updating a blog',() => {

  test('updating the likes on a blog works', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikesValue  = blogToUpdate.likes + 1
    blogToUpdate.likes = newLikesValue
    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type',/application\/json/)
    expect(response.body.likes).toEqual(newLikesValue)
  })

  test('updating the likes on a blog that does not exist', async() => {
    const nonExisitngId = await helper.nonExisitngId()
    const blogToUpdate = {
      likes: 0
    }
    const response = await api.put(`/api/blogs/${nonExisitngId}`)
      .send(blogToUpdate)
      .expect(200)
    expect(response.body).toBeNull()
  })
})

afterAll(() => {
  mongoose.connection.close()

})