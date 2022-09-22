import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user)
    }
  }
}
export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user)
      dispatch(
        showNotification(`${user.name} logged in succefully`, true, 5000)
      )
    } catch (error) {
      dispatch(
        showNotification(
          'There was an error logging in, ' + error.response.data.error,
          false,
          5000
        )
      )
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}
export default userSlice.reducer
