import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async(content) =>{
  const object = {
    content,
    votes:0
  }
  const resp = await axios.post(baseUrl,object)
  return resp.data
}

const anecdoteService = { getAll, createNew }
export default anecdoteService
