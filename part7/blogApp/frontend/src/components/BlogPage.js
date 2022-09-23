import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const BlogPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)
  const id = params.id

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
          <div>{thisBlog.likes} likes</div>
          <div>added by {thisBlog.user ? thisBlog.user.name : null}</div>
        </div>
      )
    }
  }
}
export default BlogPage
