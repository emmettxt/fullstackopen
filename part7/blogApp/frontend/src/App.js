import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userRedcuer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])
  const user = useSelector(state => state.user)

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
            <LogoutButton />
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
