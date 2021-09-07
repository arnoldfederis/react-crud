import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import sidebar from './sidebar'

export default combineReducers({
  app,
  user,
  sidebar
})
