const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs.js')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter )

module.exports = app