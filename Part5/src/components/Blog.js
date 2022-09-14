import { useState } from 'react'
const Blog = ({ blog, updateLike, deleteBlog, isCurrentUsers }) => {
  const [isExpanded, setIsExpaned] = useState(false)
  const showWhenExpanded = { display: isExpanded ? '' : 'none' }
  const showWhenCurrentUsers = { display: isCurrentUsers ? '' : 'none' }
  const toggleExpand = () => { setIsExpaned(!isExpanded) }

  const handleLike = async () => {
    await updateLike(blog.id, blog.likes + 1)
  }
  const handledeleteBlog = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleExpand}>
          {isExpanded ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenExpanded}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.name : ''}
        </div>
        <div style={showWhenCurrentUsers}>
          <button onClick={handledeleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog