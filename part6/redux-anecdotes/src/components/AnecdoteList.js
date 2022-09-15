import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (<div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>)
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
   anecdotes.filter(
    a => a.content.toLowerCase().includes(filter.toLowerCase())))
  return (
    <div>
      {anecdotes.map(a =>
        <Anecdote
          key={a.id}
          anecdote={a}
          handleVote={() => {
            dispatch(setNotification(`you voted '${a.content}'`,5))
            dispatch(voteAnecdote(a))
          }}
        />)}
    </div>
  )
}

export default AnecdoteList