import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { replaceBlog, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = params.id
  const handleLike = async blog => {
    const newBlog = {
      likes: blog.likes + 1,
    }
    await dispatch(updateBlog(blog.id, newBlog))
  }
  const addComment = async event => {
    event.preventDefault()
    const response = await blogService.addComment(id,event.target.comment.value)
    await dispatch(replaceBlog(response))
    event.target.comment.value =''

  }
  if (!blogs) {
    navigate('/')
  } else {
    const thisBlog = blogs.find(b => b.id === id)
    if (!thisBlog) {
      navigate('/')
    } else {
      return (
        <div>
          <h1>{thisBlog.title}</h1>
          <a href={thisBlog.url}>{thisBlog.url}</a>
          <div>
            {thisBlog.likes} likes{' '}
            <button
              onClick={() => {
                handleLike(thisBlog)
              }}
            >
              like
            </button>
          </div>
          <div>added by {thisBlog.user ? thisBlog.user.name : null}</div>

          <div>
            <h3>comments</h3>
            <form onSubmit={addComment}>
              <input type="text" name="comment"></input>
              <button type="submit">add comment</button>
            </form>
            <ul>
              {thisBlog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}
export default BlogPage
