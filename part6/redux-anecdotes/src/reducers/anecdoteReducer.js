import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload
    //   const anecdoteToChange = state.find(n => n.id === id)
    //   const updatedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   return state
    //     .map(a =>
    //       a.id === id ?
    //         updatedAnecdote :
    //         a
    //     )
    //     .sort(
    //       (a, b) => b.votes - a.votes
    //     )
    // },
    updateAnecdote(state, action) {
      const anecdote = action.payload
      return state
        .map(a =>
          a.id === anecdote.id ? anecdote : a)
        .sort(
          (a, b) => b.votes - a.votes
        )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})
export const { setAnecdotes, updateAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = anecdote => {
  return async dispatch =>{
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }

}
export default anecdoteSlice.reducer