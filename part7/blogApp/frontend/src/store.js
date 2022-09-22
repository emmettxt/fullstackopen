import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userRedcuer from './reducers/userRedcuer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userRedcuer,
  },
})

export default store
