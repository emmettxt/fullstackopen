const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs.js')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter )
app.use('/api/login',loginRouter )


module.exports = app