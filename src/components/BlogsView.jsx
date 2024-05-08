import Blog from './Blog';

const BlogsView = ({ blogs, onLikes }) => {
  return (
    <dl>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLikes = {onLikes} />
      ))}
    </dl>
  )
}

export default BlogsView