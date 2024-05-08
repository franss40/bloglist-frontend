import { useState } from "react"


const Blog = ({ blog }) => {
  const [view, setView] = useState(true)

  const handleView = () => {
    setView(!view)
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
          Likes: {blog.likes} <button>Like</button>
        </p>
        <p>
          Written by <strong>{blog.author}</strong>
        </p>
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