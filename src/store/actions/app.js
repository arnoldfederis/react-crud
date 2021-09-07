import { SHOW_ALERT } from './types'

export const showAlert = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_ALERT,
      payload
    })
  } catch (err) {
    console.log(err)
  }
}
