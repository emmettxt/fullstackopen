import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/userRedcuer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async event => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    await dispatch(
      loginUser(credentials)
    )
    navigate('/')
  }
  return (
    <form onSubmit={handleLogin} id="login-form">
      <div>
        <h1>log in to application</h1>
        username
        <input
          type="text"
          // value={username}
          name="username"
          // onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          // value={password}
          name="password"
          // onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm
