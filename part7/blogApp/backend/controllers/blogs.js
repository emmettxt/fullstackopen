const blogRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  //check url and title are in request body
  if (!request.body.title || !request.body.url) {
    response
      .status(400)
      .json({ error: 'blog requires a title and a url' })
      .send()
    return
  }
  //if no likes given then set to 0
  if (!request.body.likes) {
    request.body.likes = 0
  }
  const user = request.user
  //new blog object, with user id
  const blog = new Blog(request.body).set('user', user.id.toString())
  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  //add blog to user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})
blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if (user.id.toString() !== blog.user.toString()) {
    return res.status(401).end()
  }
  if (blog) {
    user.blogs.filter((b) => b.toString() !== blog._id)
    await user.save()
    await blog.remove()
  }
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const blog = {
    likes: req.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  res.json(updatedBlog)
})
module.exports = blogRouter
