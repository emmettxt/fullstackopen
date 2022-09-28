import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UserPage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const id = params.id
  const users = useSelector(state => state.users)

  if (!users) {
    navigate('/users')
  } else {
    const thisUser = users.find(u => u.id === id)
    if (!thisUser) {
      navigate('/users')
    } else {
      return (
        <div>
          <h2>{thisUser.name}</h2>
          <ListGroup>
          <h3>added blogs</h3>
            {thisUser.blogs.map(blog => (
              <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )
    }
  }
}

export default UserPage
