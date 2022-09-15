import { createSlice } from "@reduxjs/toolkit"
const initialState = 'welecome to the anecdote app!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotificationMessage(state, action) {
      return null
    }
  }
})

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions
let timeoutID 
export const setNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(setNotificationMessage(message))
    timeoutID = setTimeout(
      () => dispatch(clearNotificationMessage()), seconds * 1000
    )
    

  }
}
export default notificationSlice.reducer