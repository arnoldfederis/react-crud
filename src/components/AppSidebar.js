import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppSidebar = () => {
  const { isToggled } = useSelector(state => state.sidebar)

  const links = [
    {
      path: '/users',
      label: 'Users'
    },
    {
      path: '/test',
      label: 'Test'
    }
  ]

  return (
    <div className={`sidebar ${isToggled ? 'open': ''}`}>
      <div className="d-flex flex-column flex-shrink-0 py-3 px-2">
        <Link to="/" className="d-flex align-items-center justify-content-center mb-2">
          <img src="/logo192.png" alt="sidebar-icon" />
        </Link>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            {links.map((link, key) =>
              <NavLink
                to={link.path}
                exact
                activeClassName="active"
                className="nav-link p-3 fw-bold"
                key={key}>
                {link.label}
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AppSidebar
