const Blog = ({ blog }) => (
  <div>
    <dt>
      <h3>{blog.title}</h3>
    </dt>
    <dd>
      Written by <strong>{blog.author}</strong>
    </dd>
    <hr />
  </div>
)

export default Blog