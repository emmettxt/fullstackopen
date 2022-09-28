// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import { Form, Button, Row, Col } from 'react-bootstrap'
const BlogForm = () => {
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
    <Form onSubmit={addBlog} id="BlogForm" className="col-md-10">
      <Form.Group as={Row} className="mb-3" controlId="title">
        <Form.Label column sm={3}>
          blog title
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Enter Blog Title"
            name="title"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="author">
        <Form.Label column sm={3}>
          author
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Enter Blog Author"
            name="author"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="url">
        <Form.Label className="col-sm-3">url</Form.Label>
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter Blog URL"
            name="url"
            className="col-sm-9"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="createButton">
        <Button type="submit">create</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
