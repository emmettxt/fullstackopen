import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userRedcuer'
import { Button } from 'react-bootstrap'

const LogoutButton = () => {
  const dispatch = useDispatch()
  return <Button onClick={() => dispatch(logoutUser())}>logout</Button>
}

export default LogoutButton