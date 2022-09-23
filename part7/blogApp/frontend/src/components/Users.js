import { useEffect } from 'react'
// import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  // const [users, setUsers] = useState([])
  useEffect(() => {
    // userService.getUsers().then(response => setUsers(response))
    dispatch(initializeUsers())
  },[])
  if (users) {
    return (
      <div>
        <h1>users</h1>
        <table>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default Users
