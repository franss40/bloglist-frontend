import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLikes, onRemove, user }) => {
  const [view, setView] = useState(true)

  const handleView = () => {
    setView(!view)
  }

  const handleLike = async (blog) => {
    onLikes(blog)
  }

  const viewButton = view ? (
    <>
      <h3>
        {blog.title} <button onClick={handleView}>View</button>
      </h3>
    </>
  ) : (
    <>
      <h3>
        {blog.title}
        <button onClick={handleView}>Hide</button>
      </h3>
      <div style={{ paddingLeft: "10px" }} data-testid={blog.title}>
        <p>{blog.url}</p>
        <p>
          Likes: <span data-testid="numberLikes">{blog.likes}</span>{" "}
          <button data-testid="buttonLike" onClick={() => handleLike(blog)}>
            Like
          </button>
        </p>
        <p>
          Written by <strong>{blog.author}</strong>
        </p>

        {user.username === blog.user.username && (
          <p>
            <button onClick={() => onRemove(blog.id)}>Remove</button>
          </p>
        )}
      </div>
    </>
  )

  return (
    <div>
      {viewButton}
      <hr />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikes: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog