import { combineReducers } from 'redux'
import {
  UPDATE_TOPICS,
  SET_ERROR,
  SET_TOKEN,
  TOGGLE_LOADING
} from './actions'

function newTab (data) {
  return Object.assign({
    hasMore: true,
    list: [],
    page: 1
  }, data)
}

function topics(
  state = {
    tab: 'all',
    tabs: [
      newTab({
        id: 'all',
        label: '全部'
      }),
      newTab({
        id: 'good',
        label: '精华'
      }),
      newTab({
        id: 'share',
        label: '分享'
      }),
      newTab({
        id: 'ask',
        label: '问答'
      }),
      newTab({
        id: 'job',
        label: '招聘'
      })
    ],
    details: {}
  },
  action
) {
  switch (action.type) {
    case UPDATE_TOPICS:
      state = JSON.parse(JSON.stringify(state))
      let topics = state.tabs.find(tab => tab.id === state.tab)
      if (action.topics.length < 40 || topics.page === 99) {
        topics.hasMore = false
      } else {
        topics.page ++
      }
      topics.list = topics.list.concat(action.topics)
      return state
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

function error(state = '', action) {
  switch (action.type) {
    case SET_ERROR:
    return action.error
    default:
      return state
  }
}

const rootReducer = combineReducers({
  error,
  topics,
  token,
  loading
})

export default rootReducer