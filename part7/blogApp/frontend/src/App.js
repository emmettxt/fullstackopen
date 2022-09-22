import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const showNotification = (message, isGood, timeout) => {
    dispatch(setNotification({ message, isGood }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`${user.name} logged in succefully`, true, 5000)
    } catch (error) {
      console.log(error)
      showNotification(
        'There was an error logging in, ' + error.response.data.error,
        false,
        5000
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async blogObject => {
    try {
      const returnedBlog = await dispatch(createBlog(blogObject))
      showNotification(
        `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        true,
        5000
      )
    } catch (error) {
      showNotification(
        `there was an error adding blog: ${error.response.data.error}`,
        false,
        5000
      )
      throw error //so that the component does not continue
    }
  }

  const handleLike = async (id, likes) => {
    const newblogObject = {
      likes: likes,
    }
    await dispatch(updateBlog(id,newblogObject))
  }
  const handleDeleteBlog = async blogToRemove => {
    try {
      await dispatch(deleteBlog(blogToRemove.id))
      showNotification(`Deleted blog "${blogToRemove.title}"`, true, 5000)
    } catch (error) {
      showNotification(
        `could not delete blog "${blogToRemove.title}": ${error.message}`,
        false,
        10000
      )
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />

      {user === null ? (
        LoginForm({
          username,
          password,
          handleLogin,
          setUsername,
          setPassword,
        })
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

          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={handleLike}
              deleteBlog={handleDeleteBlog}
              isCurrentUsers={blog.user ? blog.user.id === user.id : false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
