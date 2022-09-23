import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userRedcuer from './reducers/userRedcuer'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userRedcuer,
    users:usersReducer
  },
})

export default store
