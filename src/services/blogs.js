import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject, token) => {
  const tokenBeaver = `Bearer ${token}`
  const config = {
    headers: { Authorization: tokenBeaver },
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const editBlog = async (newObject) => {
  const id = newObject.id
  const response = await axios.put(baseUrl + '/' + id, newObject)
  return response.data
}

export default { getAll, createBlog, editBlog }