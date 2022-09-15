import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
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
    setAnecdotes(state,action){
      return action.payload
    }
  }
})
export const {createAnecdote,setAnecdotes,voteAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer