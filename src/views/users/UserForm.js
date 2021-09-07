import { Card, Col, Row } from 'react-bootstrap'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleData, saveData, updateData } from '../../store/actions/user'
import { useEffect } from 'react'
import firebase from '../../config/firebase'
import { Helmet } from 'react-helmet'

const UserForm = ({ action }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user, isLoaded } = useSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    if (action === 'edit') {
      dispatch(fetchSingleData(id))

      if (!user) {
        history.push('/404-page-not-found')
      }
    }
  }, [ user ])

  const userForms = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      isHalf: true,
      placeholder: 'Input First Name'
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      isHalf: true,
      placeholder: 'Input Last Name'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Name',
      isHalf: false,
      placeholder: 'Input Email'
    }
  ]

  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required')
  })

  const onSave = (fields) => {
    if (action === 'edit') {
      dispatch(updateData({ id, fields }))
    } else {
      dispatch(saveData(fields))
    }

    history.push('/users')
  }

  return (
    <>
      <Helmet>
        {action === 'create' && (
          <title>Create User</title>
        )}
        {(isLoaded && action === 'edit') && (
          <title>Edit {user?.firstName}</title>
        )}
      </Helmet>
      <Card className="mb-5 shadow">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            {action === 'create' && (
              <h2 className="card-title fw-bold">Create User</h2>
            )}
            {(isLoaded && action === 'edit') && (
              <h2 className="card-title fw-bold">Edit {user.firstName}</h2>
            )}
          </div>
          <hr />

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSave}>
            {({ errors, touched, isSubmitting, isValid, setFieldValue }) => {
              useEffect(() => {
                let isMounted = true
                if (action === 'edit') {
                  firebase
                    .collection('users')
                    .where('id', '==', id)
                    .get()
                    .then(snapchat => {
                      if (isMounted) {
                        snapchat.forEach(doc => {
                          const user = doc.data()
                          const fields = [ 'firstName', 'lastName', 'email' ]
                          fields.forEach(field => setFieldValue(field, user[field], false))
                        })
                      }
                    })
                }

                return () => {
                  isMounted = false
                }
              }, [])

              return (
                <Form>
                  <Row>
                    {userForms.map((userForm, index) => (
                      <Col lg={userForm.isHalf ? 6 : 12} key={index}>
                        <div className="position-relative mb-3">
                          <label className="form-label fw-bold">{userForm.label}</label>
                          <ErrorMessage
                            name={userForm.name}
                            component="div"
                            className="position-absolute end-0 form-control-invalid" />
                          <Field
                            name={userForm.name}
                            type={userForm.type}
                            placeholder={userForm.placeholder}
                            className={'border-0 fw-bold form-control' + (errors[userForm.name] && touched[userForm.name] ? ' is-invalid' : '')} />
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="btn btn-primary fw-bold me-2"
                      onSubmit={onSave}>
                      {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1" /> : 'Save'}
                    </button>
                    <Link to="/users" className="btn btn-light fw-bold">Cancel</Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </Card.Body>
      </Card>
    </>
  )
}

export default UserForm
