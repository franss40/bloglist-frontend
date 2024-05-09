import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data.sort(function(a,b) {return b.likes - a.likes})
  })
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

const removeBlog = async(id, token) => {
  const tokenBeaver = `Bearer ${token}`
  const config = {
    headers: { Authorization: tokenBeaver },
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

export default { getAll, createBlog, editBlog, removeBlog }