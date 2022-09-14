import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const[notifcationMessage, setNotificationMessage] = useState('')
  const[notifcationIsGood, setNotificationIsGood] = useState(false)

  const showNotification = (message, isGood,timeout) =>{
    setNotificationIsGood(isGood)
    setNotificationMessage(message)
    setTimeout(()=>{
      setNotificationMessage(null)
    },timeout)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`${user.name} logged in succefully`,true,5000)
    } catch (error) {
      console.log(error)
      showNotification('There was an error logging in, ' + error.response.data.error, false, 5000)

    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)

  }

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
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
      <Notification message={notifcationMessage} isGood={notifcationIsGood}/>

      {user === null ?
        LoginForm({ username, password, handleLogin, setUsername, setPassword }) :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm blogs = {blogs} setBlogs ={setBlogs} showNotification ={showNotification}/>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>

  )
}

export default App
