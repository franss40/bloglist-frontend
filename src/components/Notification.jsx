import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) return null
  let style = { color: 'red', border: '5px solid red', padding: '10px', background: '#b5b5b5' }
  if (type !== 'red') {
    style = { color: 'green', border: '5px solid green', padding: '10px', background: '#b5b5b5' }
  }
  return <p style={style}>{message}</p>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default Notification