import { useState } from "react"

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
        {blog.title} <button onClick={handleView}>Hide</button>
      </h3>
      <div style={{ paddingLeft: "10px" }}>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>Like</button>
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


export default Blog