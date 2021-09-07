import { SHOW_ALERT } from '../actions/types'

const initialState = {
  alert: {
    showAlert: false,
    variant: 'success',
    message: ''
  }
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_ALERT:
      setTimeout(() => state.alert.showAlert = false, 1000)
      return { ...state, alert: { ...payload } }

    default:
      return state
  }
}

export default appReducer
