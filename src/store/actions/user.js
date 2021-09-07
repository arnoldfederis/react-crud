import firebase from '../../config/firebase'
import moment from 'moment'
import { CREATE_USER, DELETE_USER, EDIT_USER, READ_USERS, SHOW_ALERT, UPDATE_USER } from './types'
import { v4 as uuidV4 } from 'uuid'

const fireStore = firebase.collection('users')

const showAlert = ({ dispatch, message, variant }) => {
  dispatch({
    type: SHOW_ALERT,
    payload: { message, showAlert: true, variant }
  })

  setTimeout(() => {
    dispatch({
      type: SHOW_ALERT,
      payload: { showAlert: false }
    })
  }, 3000)
}

export const saveData = (fields) => async (dispatch) => {
  try {
    const dates = {
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const payload = { ...fields, ...dates, id: uuidV4() }
    await fireStore.doc().set(payload)

    dispatch({
      type: CREATE_USER,
      payload
    })

    showAlert({ dispatch, message: 'Successfully Added.', variant: 'success' })
  } catch (err) {
    console.log(err)
  }
}

export const fetchData = () => (dispatch) => {
  try {
    fireStore
      .orderBy('updatedAt', 'desc')
      .onSnapshot(snapshot => {
        let payload = []
        snapshot.forEach((doc) => payload.push(doc.data()))

        dispatch({
          type: READ_USERS,
          payload
        })
      })
  } catch (err) {
    console.log(err)
  }
}

export const fetchSingleData = (id) => async (dispatch) => {
  try {
    let payload = {}
    const snapchat = await fireStore.where('id', '==', id).get()

    snapchat.forEach(doc => {
      payload.user = doc.data()
      payload.isLoaded = true
    })

    dispatch({
      type: EDIT_USER,
      payload: payload
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateData = ({ id, fields }) => async (dispatch) => {
  try {
    const payload = { ...fields, updatedAt: moment().format('YYYY-MM-DD HH:mm:ss') }

    const snapshot = await fireStore.where('id', '==', id).get()
    snapshot.forEach(doc => doc.ref.update(payload))

    dispatch({
      type: UPDATE_USER,
      payload
    })

    showAlert({ dispatch, message: 'Successfully Updated.', variant: 'success' })
  } catch (err) {
    console.log(err)
  }
}

export const destroyData = (id) => (dispatch) => {
  try {
    fireStore
      .where('id', '==', id)
      .get()
      .then(snapshot => snapshot.forEach(doc => doc.ref.delete()))

    dispatch({
      type: DELETE_USER,
      payload: { id }
    })

    showAlert({ dispatch, message: 'Successfully Deleted.', variant: 'success' })
  } catch (err) {
    console.log(err)
  }
}
