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
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [color, setColor] = useState("red")

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem("loggedUser")
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
    }
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.createBlog(
        { title, author, url },
        user.token
      )
      setBlogs(blogs.concat(response))
      setErrorMessage("New blog: " + response.title + " by " + response.author)
      setColor('green')
    } catch (error) {
      setErrorMessage("failure to create blog")
      setColor("red")
    } finally {
      setTitle("")
      setAuthor("")
      setUrl("")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setErrorMessage('logging in with ' + user.username)
      setColor("green")
    } catch (error) {
      setErrorMessage("Wrong credentials")
      setColor("red")
    } finally {
      setUsername("")
      setPassword("")
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

  const createblogs = () => (
    <div>
      <form onSubmit={ handleCreate }>
        <p>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={ title }
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          <label htmlFor="author">Author </label>
          <input
            type="text"
            value={ author }
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          <label htmlFor="url">Url </label>
          <input
            type="text"
            value={ url }
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>
        <button type="submit">create</button>
      </form>
      <hr />
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} type={color} />

      {user === null ? (
        <div>
          <h1>blogs</h1>
          { loginForm() }
        </div>
      ) : (
        <div>
          <p>{ user.name } logged-in <button onClick={ handleLogout }>logout</button></p>
          <h1>blogs</h1>
          { createblogs() }
          { blogsView() }
        </div>
      )}
    </div>
  )
}

export default App
