import { useSelector } from "react-redux"

const Notification = () => {
  const { message, isGood } = useSelector(state => state.notification)
  
  if (message) {
    const notifcationStyle = {
      color: isGood ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    return (
      <div style={notifcationStyle} id="notification">
        {message}
      </div>
    )
  } else return null
}

export default Notification
