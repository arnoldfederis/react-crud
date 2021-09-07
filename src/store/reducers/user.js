import { CREATE_USER, DELETE_USER, EDIT_USER, READ_USERS, UPDATE_USER } from '../actions/types'

const initialState = {
  users: [],
  user: {},
  isLoaded: false
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER:
      return state

    case READ_USERS:
      return { ...state, users: payload }

    case EDIT_USER:
      return { ...state, user: payload.user, isLoaded: payload.isLoaded }

    case UPDATE_USER:
      return state

    case DELETE_USER:
      return { ...state, users: state.users.filter(({ id }) => id !== payload.id) }

    default:
      return state
  }
}

export default userReducer
