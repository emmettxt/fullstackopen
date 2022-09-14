const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('./config') //for .env variables
const bcrypt = require('bcrypt')


const connectClearAndDisconnect = async () => {
  await mongoose.connect(config.MONGODB_URI)
  await User.deleteMany({})
  console.log('Users Deleted')

  const passwordHash = await bcrypt.hash('password', 10)
  const primaryUser = new User({
    username: 'root',
    name: 'root blogs user',
    passwordHash: passwordHash

  })
  await primaryUser.save()

  await mongoose.disconnect()
}

connectClearAndDisconnect()
