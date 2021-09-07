import { TOGGLE_SIDEBAR } from './types'

export const toggleSideBar = () => async (dispatch, getState) => {
  try {
    const { sidebar } = getState()

    dispatch({
      type: TOGGLE_SIDEBAR,
      payload: sidebar.isToggled = !sidebar.isToggled
    })
  } catch (err) {
    console.log(err)
  }
}
