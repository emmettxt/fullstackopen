import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
let authConfig = {
  headers: { Authorization: token }
}
const setToken = (newToken) => {
  token = `bearer ${newToken}`
  authConfig.headers.Authorization = token
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}
const remove = async(id) =>{
  const resp = await axios.delete(`${baseUrl}/${id}`,authConfig)
  return resp
}

const blogService = { getAll, create, setToken, update, remove }
export default blogService