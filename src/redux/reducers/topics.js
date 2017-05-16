import { combineReducers } from 'redux'
import {
  UPDATE_TOPIC,
  UPDATE_TOPICS,
  UPDATE_TOPICS_LOADING,
  UPDATE_TOPICS_TAB
} from '../actions'


function newTab(data) {
  return Object.assign({
    hasMore: true,
    list: [],
    loading: false,
    page: 1
  }, data)
}

function tab(state = {
  list: []
}, action) {
  if (action.type === UPDATE_TOPICS_TAB) return action.tab
  return state
}

function tabs(state = [
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
], action) {
  state = [].concat(state)
  let topics = state.find(tab => tab.id === action.tabId)
  switch (action.type) {
    case UPDATE_TOPICS_LOADING:
      topics.loading = action.loading
      return state
    case UPDATE_TOPICS:
      if (action.topics.length < 40 || topics.page === 99) {
        topics.hasMore = false
      } else {
        topics.page++
      }
      topics.list = topics.list.concat(action.topics)
      return state
    default:
      return state
  }
}

function details(state = {}, action) {
  if (action.type === UPDATE_TOPIC) {
    state[action.topic.id] = action.topic;
  }
  return state;
}


const topic = combineReducers({
  tab,
  tabs,
  details
})

export default topic;
