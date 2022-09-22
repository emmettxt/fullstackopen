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
    replaceBlog(state, action) {
      const replacedBlog = action.payload
      return state
        .map(b => (b.id === replacedBlog.id ? replacedBlog : b))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state,action){
      const id =action.payload
      return state.filter(b => b.id !== id)
    }
  },
})

export const { toggleVisibilityOf, appendBlog, setBlogs, replaceBlog ,removeBlog} =
  blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(
      setBlogs(
        blogs
          .map(b => ({ ...b, visible: false }))
          .sort((a, b) => b.likes - a.likes)
      )
    )
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog({ ...newBlog, visible: false }))
    return newBlog
  }
}
export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(replaceBlog(updatedBlog))
    return updatedBlog
  }
}
export const deleteBlog = id =>{
  return async dispatch =>{
    const resp = await blogService.remove(id)
    dispatch(removeBlog(id))
    return resp
  }
}

export default blogSlice.reducer
