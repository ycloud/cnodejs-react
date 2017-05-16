import { combineReducers } from 'redux'
import {
  SET_ERROR,
  SET_TOKEN,
  TOGGLE_LOADING
} from '../actions'
import topics from './topics'


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

const rootReducer = combineReducers({
  error,
  topics,
  token,
  loading
})

export default rootReducer
