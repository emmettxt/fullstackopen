const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const user = await User.findOne({})
  const blogs = await Blog.find({}).populate('user',{ username: user.username,name:user.name })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  //check url and title are in request body
  if(!request.body.title || !request.body.url){
    response.status(400).send()
    return
  }
  //if no likes given then set to 0
  if(!request.body.likes){
    request.body.likes = 0
  }
  //find any user
  const user = await User.findOne({})
  //new blog object, with user id
  const blog = new Blog(request.body)
    .set('user',user.id.toString())
  const savedBlog = await blog.save()
  //add blog to user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})
blogRouter.delete('/:id',async(req,res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id' ,async(req,res) => {
  const blog = {
    likes: req.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,blog, { new: true })
  res.json(updatedBlog)

})
module.exports = blogRouter