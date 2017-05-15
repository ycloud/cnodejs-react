import { combineReducers } from 'redux'
import {
  UPDATE_TOPICS,
  SET_TOKEN,
  TOGGLE_LOADING
} from './actions'

function topics(
  state = [],
  action
) {
  switch (action.type) {
    case UPDATE_TOPICS:
      return state.concat(action.topics)
    default:
      return state
  }
}

function token(state = '', action) {
  switch (action.type) {
    case SET_TOKEN:
    return action.token
    default:
      return state
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
    return action.loading
    default:
      return state
  }
}

const rootReducer = combineReducers({
  topics,
  token,
  loading
})

export default rootReducer