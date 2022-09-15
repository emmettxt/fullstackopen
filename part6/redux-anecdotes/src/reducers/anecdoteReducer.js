export const createAnecdote = (anecdote) => {
  return {
    type: "CREATE",
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: {
      id
    }
  }
}
export const setAnecdotes = (data) =>{
  return {
    type:"SET",data
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id === id ?
          updatedAnecdote :
          a
      )
        .sort(
          (a, b) => b.votes - a.votes
        )
    case "CREATE":
      return [...state, action.data]
    case "SET":
      return action.data
    default:
      return state
  }
}

export default reducer