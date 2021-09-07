import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import AppSidebar from '../components/AppSidebar'
import AppNavBar from '../components/AppNavBar'

import Users from './users/Users'
import UserForm from './users/UserForm'
import NotFound from './errors/NotFound'

import { Alert, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const App = () => {
  const { isToggled } = useSelector(state => state.sidebar)
  const { variant, showAlert, message } = useSelector(state => state.app.alert)

  return (
    <BrowserRouter>
      <main className={`app ${isToggled ? 'open' : ''}`}>
        <AppNavBar />
        <div className="p-3">
          <Container fluid>
            <Row>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/users" />
                </Route>
                <Route exact path="/users">
                  <Users />
                </Route>
                <Route exact path="/users/create">
                  <UserForm action="create" />
                </Route>
                <Route exact path="/users/:id/edit">
                  <UserForm action="edit" />
                </Route>
                <Route exact path="/404-page-not-found">
                  <NotFound />
                </Route>
                <Route path="*">
                  <Redirect to="/404-page-not-found" />
                </Route>
              </Switch>
            </Row>
          </Container>
        </div>

        {showAlert && (
          <Alert variant={variant}>
            <p className="mb-0 fw-bold">{message}</p>
          </Alert>
        )}

      </main>
      <AppSidebar />
    </BrowserRouter>
  )
}

export default App
