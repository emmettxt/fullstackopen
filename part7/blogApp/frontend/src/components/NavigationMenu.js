import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { Nav, Navbar, Container } from 'react-bootstrap'
const NavigationMenu = () => {
  const user = useSelector(state => state.user)
  // const NavigationMenuStyle = { background: 'lightgrey', spacing: 2 }
  // const padded = { padding: 2 }
  return (
    <Container>
      <Navbar className='justify-content-between'>
        <Nav
          className="flex-grow-1 pe-3"
          activeKey={window.location.pathname}
          variant="pills"
        >
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Nav.Item>
            <Nav.Link href={'/'}>blogs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={'/users'}>users</Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Text>
          {user.name} logged-in <LogoutButton />
        </Navbar.Text>
      </Navbar>
    </Container>
    // <div style={NavigationMenuStyle}>
    //   <Link to={'/users'}style={padded}>users</Link>
    // </div>
  )
}

export default NavigationMenu
