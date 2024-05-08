import Blog from './Blog';

const BlogsView = ({ blogs }) => {
  return (
    <dl>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </dl>
  )
}

export default BlogsView