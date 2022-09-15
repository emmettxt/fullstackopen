import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(action.payload)
    // },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state
        .map(a =>
          a.id === id ?
            updatedAnecdote :
            a
        )
        .sort(
          (a, b) => b.votes - a.votes
        )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    }
  }
})
export const { setAnecdotes, voteAnecdote , appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const  createAnecdote = content => {
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    return dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer