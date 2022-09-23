import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton'
import Users from './components/Users'
import UserPage from './components/UserPage'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userRedcuer'

const AppRoutes = () => {
  const user = useSelector(state => state.user)
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Togglable buttonLabel="new blog">
              <BlogForm />
            </Togglable>
            <Blogs user={user} />
          </div>
        }
      />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserPage/>} />
    </Routes>
  )
}

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
          {/* <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <Blogs user={user} /> */}
          <AppRoutes />
        </div>
      )}
    </div>
  )
}

export default App
