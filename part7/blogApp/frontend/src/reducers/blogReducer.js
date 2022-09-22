import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    toggleVisibilityOf(state, action) {
      const id = action.payload
      const blogToToggle = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToToggle,
        visible: !blogToToggle.visible,
      }
      return state.map(b => (b.id !== id ? b : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { toggleVisibilityOf, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.map(b => ({ ...b, visible: false }))))
  }
}

export const creatBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog({ ...newBlog, visible: false }))
  }
}

export default blogSlice.reducer
