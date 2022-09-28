import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { Accordion } from 'react-bootstrap'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const handleLike = async (id, likes) => {
    const newblogObject = {
      likes: likes,
    }
    await dispatch(updateBlog(id, newblogObject))
  }
  const handleDeleteBlog = async blogToRemove => {
    try {
      await dispatch(deleteBlog(blogToRemove.id))
      dispatch(
        showNotification(`Deleted blog "${blogToRemove.title}"`, true, 5000)
      )
    } catch (error) {
      dispatch(
        showNotification(
          `could not delete blog "${blogToRemove.title}": ${error.message}`,
          false,
          10000
        )
      )
    }
  }
  return (
    <Accordion alwaysOpen>
      {blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        updateLike={handleLike}
        deleteBlog={handleDeleteBlog}
        isCurrentUsers={blog.user && blog.user.id === user.id}
      />
      ))}
    </Accordion>
  )
}

export default Blogs
