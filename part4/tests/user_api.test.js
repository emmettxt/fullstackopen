const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async() => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('there is one user in the DB', () => {

  describe('Adding users', () => {

    test('username less than 3 characters fails with status code 400', async() => {
      const user = {
        'username':'a',
        'password':'password',
        'name' : 'name'
      }
      //send request and checking status code
      const response = await api.post('/api/users').send(user).expect(400)

      //check error message
      expect(response.body.error).toEqual('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')

      //check the number of users in db hasnt changed
      const usersAfter = await helper.usersInDb()
      expect(usersAfter).toHaveLength(1)
    })

    test('password less than 3 characters fails with status code 400', async() => {
      const user = {
        'username':'username',
        'password':'a',
        'name' : 'name'
      }

      //send request and checking status code
      const response = await api.post('/api/users').send(user).expect(400)

      //check error message
      expect(response.body.error).toEqual('password must be at least 3 characters long')

      //check the number of users in db hasnt changed
      const usersAfter = await helper.usersInDb()
      expect(usersAfter).toHaveLength(1)
    })

    test('No username fails with status code 400', async() => {
      const user = {
        'password':'password',
        'name' : 'name'
      }
      //send request and checking status code
      const response = await api.post('/api/users').send(user).expect(400)

      //check error message
      expect(response.body.error).toEqual('User validation failed: username: Path `username` is required.')

      //check the number of users in db hasnt changed
      const usersAfter = await helper.usersInDb()
      expect(usersAfter).toHaveLength(1)
    })

    test('No password fails with status code 400', async() => {
      const user = {
        'username':'username',
        'name' : 'name'
      }

      //send request and checking status code
      const response = await api.post('/api/users').send(user).expect(400)

      //check error message
      expect(response.body.error).toEqual('must contain username and password')

      //check the number of users in db hasnt changed
      const usersAfter = await helper.usersInDb()
      expect(usersAfter).toHaveLength(1)
    })

    test('Username that not unique fails with status code 400', async() => {
      const usersBefore = await helper.usersInDb()
      const exisitngUser = usersBefore[0]

      //send request and checking status code
      const response = await api.post('/api/users').send(exisitngUser).expect(400)

      //check error message
      expect(response.body.error).toEqual('username must be unique')
      //check the number of users in db hasnt changed

      const usersAfter = await helper.usersInDb()
      expect(usersAfter).toHaveLength(1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()

})