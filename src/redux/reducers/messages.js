import {
  UPDATE_MESSAGES
} from '../actions'

function messages(state = [], action) {
  if (action.type === UPDATE_MESSAGES) {
    state = state.concat(action.messages)
  }
  return state;
}

export default messages;
