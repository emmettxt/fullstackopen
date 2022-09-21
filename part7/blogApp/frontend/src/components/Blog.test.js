import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  // let container
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'test blog url',
    likes: 5,
  }
  const user = userEvent.setup()

  const updateLike = jest.fn()
  beforeEach(() => {
    // container =
    render(<Blog blog={blog} updateLike={updateLike} />).container
  })
  test('renders title and author only initially', () => {
    const titleElement = screen.queryByText(blog.title)
    expect(titleElement).toBeDefined()

    const authorElement = screen.queryByText(blog.author)
    expect(authorElement).toBeDefined()

    const urlElementParent = screen.queryByText(blog.url).parentElement
    expect(urlElementParent).toHaveStyle('display: none')

    const likesElementParent = screen.queryByText(
      `likes ${blog.likes}`
    ).parentElement
    expect(likesElementParent).toHaveStyle('display: none')
  })

  test('likes and url are shown when when view button clicked', async () => {
    const viewButton = screen.queryByText('view')
    await user.click(viewButton)

    const urlElementParent = screen.queryByText(blog.url).parentElement
    expect(urlElementParent).not.toHaveStyle('display: none')

    const likesElementParent = screen.queryByText(
      `likes ${blog.likes}`
    ).parentElement
    expect(likesElementParent).not.toHaveStyle('display: none')
  })

  test('like button clicked twice calls updateLike twice', async () => {
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLike.mock.calls).toHaveLength(2)
  })
})
