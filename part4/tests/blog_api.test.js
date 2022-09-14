const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async() => {
  const user = await helper.createTestUser()
  await Blog.deleteMany({})
  helper.initialBlogs.forEach( async (blog) => {
    blog.user = user._id
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
  // await Blog.insertMany(helper.initialBlogs)
},10000)

test('correct amount of blogs are returned', async() => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is correctly defined', async() => {
  const response = await api
    .get('/api/blogs').expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body[0]._id).not.toBeDefined()
  expect(response.body[0].id).toBeDefined()

})
describe('adding blogs',() => {

  test('adding a blog works', async() => {
    const user = await helper.createTestUser()
    const userForToken = {
      username : user.username,
      id: user._id
    }
    const token = await helper.getValidToken(userForToken)
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
  })

  test('adding a blog with no likes sets to zero', async() => {
    const user = await helper.createTestUser()
    const userForToken = {
      username : user.username,
      id: user._id
    }
    const token = await helper.getValidToken(userForToken)
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

  })

  test('title and url missing is a bad request', async () => {
    const newBlog =  {
      'author': 'new Blog Author 1',
      'likes': 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})
describe('deleting a blog',() => {

  test('succeeds for valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete)
  })
  test('status code 404 for id that does not exist',async () => {
    const nonExisitngId = await helper.nonExisitngId()
    await api.delete(`/api/blogs/${nonExisitngId}`).expect(204)
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