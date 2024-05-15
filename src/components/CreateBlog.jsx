import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog = (event) => {
    event.preventDefault()
    handleCreate({
      author,
      title,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <p>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='title'
            value={title}
            id='title'
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          <label htmlFor='author'>Author </label>
          <input
            type='text'
            placeholder='author'
            value={author}
            name='author'
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          <label htmlFor='url'>Url </label>
          <input
            type='text'
            placeholder='url'
            value={url}
            name='url'
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateBlog
