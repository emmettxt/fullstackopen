import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// import LogoutButton from './components/LogoutButton'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import NavigationMenu from './components/NavigationMenu'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userRedcuer'
import { Col ,Container} from 'react-bootstrap'
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
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/blogs/:id" element={<BlogPage />} />
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
    <div className="container">
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <Container>
          <NavigationMenu />
          <Col md={6} className="mx-auto">
            <AppRoutes />
          </Col>
        </Container>
      )}
    </div>
  )
}

export default App
