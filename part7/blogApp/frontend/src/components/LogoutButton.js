import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userRedcuer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  return <button onClick={() => dispatch(logoutUser())}>logout</button>
}

export default LogoutButton