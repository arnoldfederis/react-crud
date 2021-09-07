import { Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { destroyData, fetchData } from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

const Users = () => {
  const { users } = useSelector(state => state.user)
  const [ showModal, setShowModal ] = useState()
  const [ user, setUser ] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  const onDestroy = (id) => {
    dispatch(destroyData(id))
    setShowModal(false)
  }

  const onShowModal = user => {
    setShowModal(true)
    setUser(user)
  }

  const onHideModal = () => {
    setUser({})
    setShowModal(false)
  }

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <Card className="mb-5 shadow rounded-3 border-0">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="card-title fw-bold">Users</h2>
            <Link to="/users/create" className="btn btn-primary fw-bold">Create</Link>
          </div>
          <hr />
          {users.length > 0 && (
            <table className="table">
              <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td data-header="First Name">{user.firstName}</td>
                  <td data-header="Last Name">{user.lastName}</td>
                  <td data-header="Email">{user.email}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/users/${user.id}/edit`} className="btn btn-primary fw-bold me-2">Edit</Link>
                      <button className="btn btn-danger fw-bold" onClick={() => onShowModal(user)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {users.length === 0 && <div className="text-center fw-bold">No records found.</div>}
        </Card.Body>
      </Card>

      <Modal centered show={showModal} size="sm">
        <Modal.Body>
          <p className="fw-bold m-0">Are you sure you want to delete {user.name}?</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => onDestroy(user.id)} className="btn btn-danger fw-bold">Delete</button>
          <button onClick={onHideModal} className="btn btn-light fw-bold">Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Users
