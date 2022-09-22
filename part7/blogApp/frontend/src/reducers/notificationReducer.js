import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', isGood: true }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return { ...state, message: '' }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
