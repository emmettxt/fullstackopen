import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, isGood } = useSelector(state => state.notification)

  if (message) {
    // const notifcationStyle = {
    //   color: isGood ? 'green' : 'red',
    //   background: 'lightgrey',
    //   fontSize: 20,
    //   borderStyle: 'solid',
    //   borderRadius: 5,
    //   padding: 10,
    //   marginBottom: 10,
    // }
    return (
      <Alert variant={isGood ? 'success' : 'danger'}>{message}</Alert>
      // <div style={notifcationStyle} id="notification">
      //   {message}
      // </div>
    )
  } else return null
}

export default Notification
