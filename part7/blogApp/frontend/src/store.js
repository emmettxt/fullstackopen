import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store
