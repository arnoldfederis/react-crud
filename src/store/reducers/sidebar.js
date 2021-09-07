import { TOGGLE_SIDEBAR } from '../actions/types'
import { get, remove, set } from '../../utils/helpers'

const initialState = {
  isToggled: get('active_sidebar') ?? false
}

const sidebarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      if (payload) {
        set('active_sidebar', payload)
      } else {
        remove('active_sidebar')
      }

      return { ...state, isToggled: payload }

    default:
      return state
  }
}

export default sidebarReducer
