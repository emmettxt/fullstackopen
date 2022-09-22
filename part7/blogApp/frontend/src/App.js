import { useEffect } from 'react'
import Blogs from './components/Blogs'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import {
  showNotification,
} from './reducers/notificationReducer'
import { initializeUser, logoutUser } from './reducers/userRedcuer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleCreateBlog = async blogObject => {
    try {
      const returnedBlog = await dispatch(createBlog(blogObject))
      dispatch(showNotification(
        `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        true,
        5000
      ))
    } catch (error) {
      dispatch(showNotification(
        `there was an error adding blog: ${error.response.data.error}`,
        false,
        5000
      ))
      throw error //so that the component does not continue
    }
  }

  return (
    <div>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
