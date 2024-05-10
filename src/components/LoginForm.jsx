import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createLogin = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={ createLogin }>
        <p>
          <label htmlFor='username'>Username </label>
          <input
            type='text'
            value={username}
            id='username'
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          <label htmlFor='password'>Password </label>
          <input
            type='password'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button type='submit'>login</button>
      </form>
      <hr />
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm