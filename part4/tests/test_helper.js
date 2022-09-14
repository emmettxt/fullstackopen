const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const nonExisitngId = async () => {
  const blog = new Blog(  {
    title: 'Will Be deleted soon',
    author: 'Will Be deleted soon',
    url: 'Will Be deleted soon',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = { initialBlogs,blogsInDb,nonExisitngId,usersInDb }