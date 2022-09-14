const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async()=>{
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('correct amount of blogs are returned', async() =>{
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is correctly defined', async() =>{
  const response = await api
    .get('/api/blogs').expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body[0]._id).not.toBeDefined()
  expect(response.body[0].id).toBeDefined()

})

test('adding a blog works', async() => {
  const newBlog =  {
    'title': 'new Blog Title 1',
    'author': 'new Blog Author 1',
    'url': 'new Blog Url 1',
    'likes': 50
  }
  const resp = await api
    .post('/api/blogs')
    .send(newBlog)
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
  //check it contains the response to the request
  expect(blogsAtEnd).toContainEqual(resp.body)

})

test('adding a blog with no likes sets to zero', async() => {
  const newBlog =  {
    'title': 'new Blog Title 1',
    'author': 'new Blog Author 1',
    'url': 'new Blog Url 1'
  }
  const resp = await api
    .post('/api/blogs')
    .send(newBlog)
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
  //check it contains the response to the request
  expect(blogsAtEnd).toContainEqual(resp.body)
  
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

afterAll(() => {
  mongoose.connection.close()
    
})