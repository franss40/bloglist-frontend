import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      console.log("logging in with", user)
    } catch (error) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button type="submit">login</button>
      </form>
      <hr />
    </div>
  )

  const blogsView = () => (
    <dl>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </dl>
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ? (
        <div>
          <h1>blogs</h1>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <h1>blogs</h1>
          <hr />
          {blogsView()}
        </div>
      )}
    </div>
  )
}

export default App
