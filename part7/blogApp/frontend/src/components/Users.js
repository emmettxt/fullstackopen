import { useEffect } from 'react'
// import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  // const [users, setUsers] = useState([])
  useEffect(() => {
    // userService.getUsers().then(response => setUsers(response))
    dispatch(initializeUsers())
  }, [])
  if (users) {
    return (
      <div>
        <h1>users</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Users
