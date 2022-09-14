import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {

  const user = userEvent.setup()

  const createBlog = jest.fn()
  let container
  beforeEach(() => {
    container = render(

      <BlogForm
        createBlog={createBlog}
      />
    ).container
  })

  test('calls createBlog with correct deatails onSubmit ', async() => {
    //find text boxes and input test data
    const titleInput = container.querySelector('[name=title]')
    await user.type(titleInput,'test title')

    const authorInput = container.querySelector('[name=author]')
    await user.type(authorInput,'test author')

    const urlInput = container.querySelector('[name=url]')
    await user.type(urlInput,'test url')

    //find the create butto and click it
    const createButton = screen.getByText('create')
    await user.click(createButton)

    // get the paramater of the call to createBlog
    const blogObject = createBlog.mock.calls[0][0]
    //check the correct values were passed
    expect(blogObject.title).toEqual('test title')
    expect(blogObject.author).toEqual('test author')
    expect(blogObject.url).toEqual('test url')

  })
})