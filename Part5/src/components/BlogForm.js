import { useState } from "react"
import blogService from "../services/blogs"
const BlogForm = ({blogs,setBlogs,showNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const returnedBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })
    setUrl('')
    setAuthor('')
    setTitle('')
    setBlogs(blogs.concat(returnedBlog))
    
    showNotification(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,true,5000)


  }
  return (
    < form onSubmit={handleCreateBlog} >
      <h1>create new</h1>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>

    </form >
  )
}

export default BlogForm
