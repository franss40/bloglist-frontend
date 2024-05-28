import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogsView = ({ blogs, onLikes, onRemove, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikes={onLikes}
          onRemove={onRemove}
          user={user}
        />
      ))}
    </div>
  )
}

BlogsView.propTypes = {
  blogs: PropTypes.array.isRequired,
  onLikes: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogsView