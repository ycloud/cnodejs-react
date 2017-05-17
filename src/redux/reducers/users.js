import {
  UPDATE_USERS
} from '../actions'

function users(state = {}, action) {
  if (action.type === UPDATE_USERS) {
    state[action.user.loginname] = action.user;
  }
  return state;
}


export default users;
