import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import CreateBlog from "./components/CreateBlog"
import LoginForm from "./components/LoginForm"
import BlogsView from "./components/BlogsView"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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

  const handleCreate = async (blog) => {
    const title = blog.title
    const author = blog.author
    const url = blog.url
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async(blog) => {
    try {
      const response = await blogService.editBlog(blog)
      const update = blogs.map(item => {
        if (item.id == blog.id) {
          return {...response, likes: response.likes}
        } else {
          return item
        }
      })
      setBlogs(update)
    } catch (error) {
      setErrorMessage("failure to update likes blog")
      setColor("red")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (username , password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setErrorMessage('logging in with ' + user.username)
      setColor("green")
    } catch (error) {
      setErrorMessage("Wrong credentials")
      setColor("red")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} type={color} />

      {user === null ? (
        <div>
          <h1>blogs</h1>
          <LoginForm handleLogin = { handleLogin } />
        </div>
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick = { handleLogout }>logout</button>
          </p>
          <h1>blogs</h1>
          <Togglable buttonLabel="Create Blog">
            <CreateBlog handleCreate = { handleCreate } />
          </Togglable>
          <BlogsView blogs = { blogs } onLikes = {handleLike} />
        </div>
      )}
    </div>
  )
}

export default App