import { combineReducers } from 'redux'
import {
  SET_ACCOUNT,
  SET_ERROR,
  SET_TOKEN,
  TOGGLE_LOADING,
  TOGGLE_NOTFOUND
} from '../actions'
import collects from './collects'
import messages from './messages'
import topics from './topics'
import users from './users'

function account(state = {}, action) {
  if (action.type === SET_ACCOUNT) return action.account
  return state
}

function token(state = '', action) {
  if (action.type === SET_TOKEN) return action.token
  return state
}

function loading(state = false, action) {
  if (action.type === TOGGLE_LOADING) return action.loading
  return state
}

function error(state = '', action) {
  if (action.type === SET_ERROR) return action.error
  return state
}

function notFound(state = false, action) {
  if (action.type === TOGGLE_NOTFOUND) return action.notFound
  return state
}

const rootReducer = combineReducers({
  account,
  collects,
  error,
  loading,
  messages,
  notFound,
  topics,
  token,
  users
})

export default rootReducer
