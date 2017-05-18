import {
  UPDATE_COLLECTS
} from '../actions'

function collects(state = [], action) {
  if (action.type === UPDATE_COLLECTS) {
    state = state.concat(action.collects)
  }
  return state;
}

export default collects;
