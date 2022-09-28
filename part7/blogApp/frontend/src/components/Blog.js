// import { useState } from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Accordion, Button } from 'react-bootstrap'

const Blog = ({ blog, updateLike, deleteBlog, isCurrentUsers }) => {
  // const [isExpanded, setIsExpaned] = useState(false)
  // const showWhenExpanded = { display: isExpanded ? '' : 'none' }
  const showWhenCurrentUsers = { display: isCurrentUsers ? '' : 'none' }
  // const toggleExpand = () => {
  //   setIsExpaned(!isExpanded)
  // }

  const handleLike = async () => {
    await updateLike(blog.id, blog.likes + 1)
  }
  const handledeleteBlog = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }

  return (
    <Accordion.Item className="blog" eventKey={blog.id}>
      <Accordion.Header>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
         - {blog.author}
      </Accordion.Header>
      <Accordion.Body>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <Button onClick={handleLike}>like</Button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <div style={showWhenCurrentUsers}>
          <Button onClick={handledeleteBlog}>delete</Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
Blog.propTypes = {
  blog: Proptypes.object.isRequired,
  updateLike: Proptypes.func.isRequired,
  deleteBlog: Proptypes.func.isRequired,
  isCurrentUsers: Proptypes.bool.isRequired,
}

export default Blog
