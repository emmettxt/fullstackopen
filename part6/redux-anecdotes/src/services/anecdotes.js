import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = {
    content,
    votes: 0
  }
  const resp = await axios.post(baseUrl, object)
  return resp.data
}
const addVote = async (anecdote) => {
  const newVotes = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const respoonse = await axios.put(`${baseUrl}/${anecdote.id}`, newVotes)
  return respoonse.data
}

const anecdoteService = { getAll, createNew, addVote }
export default anecdoteService
