import Blog from './Blog';

const BlogsView = ({ blogs, onLikes, onRemove, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLikes = {onLikes} onRemove = {onRemove} user = {user} />
      ))}
    </div>
  )
}

export default BlogsView