const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
const initialUser = {
  username:'testUser',
  password:'password'
}
const createTestUser = async () => {
  const passwordHash = await bcrypt.hash(initialUser.password,10)
  const user = new User({
    username :initialUser.username,
    passwordHash :passwordHash
  })
  await user.save()
  return user
}
const getValidToken = async () => {
  const user = await createTestUser()
  return getValidTokenForUser(user)
}
const getValidTokenForUser = async(user) => {
  const userForToken = {
    username : user.username,
    id: user._id
  }
  return await jwt.sign(userForToken, process.env.SECRET)
}
module.exports = {
  initialBlogs,
  blogsInDb,
  nonExisitngId,
  usersInDb,
  initialUser,
  createTestUser,
  getValidToken,
  getValidTokenForUser
}