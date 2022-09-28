import { Button, Form } from 'react-bootstrap'
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
    await dispatch(loginUser(credentials))
    navigate('/')
  }
  return (
    <Form onSubmit={handleLogin} id="login-form" className="col-lg-4 col-md-6 col-sm-8 col-s-10 mx-auto row">
      <h1>log in to application</h1>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control type="text" name="username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control type="password" name="password" />
      </Form.Group>
        <div className="d-flex justify-content-end">

          <Button type="submit" className="col-md-4">
            login
          </Button>
        </div>
    </Form>
  )
}
export default LoginForm
