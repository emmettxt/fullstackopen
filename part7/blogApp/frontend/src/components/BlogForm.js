// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
const BlogForm = () => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    try {
      const returnedBlog = await dispatch(createBlog(blogObject))
      dispatch(
        showNotification(
          `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
          true,
          5000
        )
      )
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (error) {
      dispatch(
        showNotification(
          `there was an error adding blog: ${error.response.data.error}`,
          false,
          5000
        )
      )
    }
  }
  return (
    <form onSubmit={addBlog} id="BlogForm">
      <h1>create new</h1>
      <div>
        title
        <input
          type="text"
          // value={title}
          name="title"
          // onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          // value={author}
          name="author"
          // onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          // value={url}
          name="url"
          // onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
