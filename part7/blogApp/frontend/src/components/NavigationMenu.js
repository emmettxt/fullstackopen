import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavigationMenu = () => {
  const user = useSelector(state => state.user)
  const NavigationMenuStyle = {background:'lightgrey',spacing:2}
  const padded = {padding:2}
  return (
    <div style={NavigationMenuStyle}>
      <Link to={'/'} style={padded}>blogs</Link>
      <Link to={'/users'}style={padded}>users</Link>
      {user.name} logged-in <LogoutButton />
    </div>
  )
}

export default NavigationMenu
