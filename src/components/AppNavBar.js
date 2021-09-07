import { Container, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { toggleSideBar } from '../store/actions/sidebar'

const AppNavBar = () => {
  const dispatch = useDispatch()

  return (
    <Navbar>
      <Container fluid>
        <Navbar.Collapse className="justify-content-end">
          <button className="navbar-toggler d-block border-0" onClick={() => dispatch(toggleSideBar())}>
            <span className="navbar-toggler-icon" />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavBar
