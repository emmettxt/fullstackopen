import { Col, Row, Button, Card, Form } from 'react-bootstrap'
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
    console.log('addComment called')
    const response = await blogService.addComment(
      id,
      event.target.comment.value
    )
    await dispatch(replaceBlog(response))
    event.target.comment.value = ''
  }
  if (!blogs) {
    navigate('/')
  } else {
    const thisBlog = blogs.find(b => b.id === id)
    if (!thisBlog) {
      navigate('/')
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Title>{thisBlog.title}</Card.Title>
            <a href={thisBlog.url}>{thisBlog.url}</a>

            <div>
              {thisBlog.likes} likes{' '}
              <Button
                onClick={() => {
                  handleLike(thisBlog)
                }}
              >
                like
              </Button>
            </div>
            <div>added by {thisBlog.user ? thisBlog.user.name : null}</div>
            <Card.Footer>
              <Card.Subtitle>comments</Card.Subtitle>

              <ul>
                {thisBlog.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <Form onSubmit={addComment}>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Add Comment..."
                      name="comment"
                    />
                  </Col>

                  <Button type="submit" className="col-sm-3">
                    add comment
                  </Button>
                </Row>
              </Form>
            </Card.Footer>
          </Card.Body>
        </Card>
      )
    }
  }
}
export default BlogPage
