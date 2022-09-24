import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'

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
          {thisBlog.comments.length>0 && (
            <div>
              <h3>comments</h3>
              <ul>
                {thisBlog.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }
  }
}
export default BlogPage
