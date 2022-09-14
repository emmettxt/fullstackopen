const Blog = require('../models/blog')
const initialBlogs = [
  {
    'title': 'Test Title 1',
    'author': 'Test Author 1',
    'url': 'Test Url 1',
    'likes': 1
  },
  {
    'title': 'Test Title 2',
    'author': 'Test Author 2',
    'url': 'Test Url 2',
    'likes': 2
  }
]

const blogsInDb = async () =>{
  const blogs = await Blog.find({})
  return blogs.map(b=>b.toJSON())
}

module.exports = {initialBlogs,blogsInDb}