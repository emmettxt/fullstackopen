const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('./config') //for .env variables
const bcrypt = require('bcrypt')


const addUserAndDisconnect = async () => {
  await mongoose.connect(config.MONGODB_URI)

  const passwordHash = await bcrypt.hash('salainen', 10)
  const primaryUser = new User({
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash: passwordHash

  })
  await primaryUser.save()

  await mongoose.disconnect()
}

addUserAndDisconnect()
