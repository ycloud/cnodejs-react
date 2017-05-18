import store from './store'
import qs from 'qs'
import axios from 'axios'

const http = axios.create({
  baseURL: 'https://share.la/cnodejs'
})
const get = (url, data) => http.get(url, {
  params: data
})

http.interceptors.request.use((config) => {
  if (config.method === 'post') config.data = qs.stringify(config.data)
  store.dispatch(toggleLoading(true))
  return config
}, error => Promise.reject(error))

http.interceptors.response.use((response) => {
  store.dispatch(toggleLoading(false))
  return response.data
}, error => {
  store.dispatch(toggleLoading(false))
  if (error.response.status === 401 &&
    error.response.config.url.endsWith('/accesstoken')) {
    return Promise.reject(error)
  }
  store.dispatch(setError(false))
  return Promise.reject(error)
})

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_ERROR = 'SET_ERROR'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_TOPICS_TAB = 'SET_TOPICS_TAB'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const TOGGLE_NOTFOUND = 'TOGGLE_NOTFOUND'
export const TOGGLE_TOPICS_LOADING = 'TOGGLE_TOPICS_LOADING'
export const UPDATE_COLLECTS = 'UPDATE_COLLECTS'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const UPDATE_TOPIC = 'UPDATE_TOPIC'
export const UPDATE_TOPICS = 'UPDATE_TOPICS'
export const UPDATE_USERS = 'UPDATE_USERS'

export function getCollects() {
  return function(dispatch, getState) {
    let {loginname} = getState().account
    return get(`/collects/${loginname}`)
      .then(collects => {
        dispatch(updateCollects(collects))
      })
  }
}

export function getMessages() {
  return function(dispatch, getState) {
    let accesstoken = getState().token
    return get('/messages', {accesstoken})
      .then(data => {
        dispatch(updateMessages(data.hasnot_read_messages))
        dispatch(updateMessages(data.has_read_messages))
      })
  }
}

export function getTopic(id) {
  return function(dispatch, getState) {
    let topic = getState().topics.details[id]
    if (typeof topic !== 'undefined') return Promise.resolve(topic)
    return get(`/topics/${id}`)
      .then(topic => {
        dispatch(updateTopic(topic))
        return topic
      })
  }
}

export function getTopics() {
  return function(dispatch, getState) {
    let tab = getState().topics.tab
    if (!tab.hasMore) return Promise.resolve('没有更多数据了！')
    if (tab.loading) return Promise.resolve('正在加载中！')
    let data = {
      page: tab.page
    }
    let tabId = tab.id
    if (tabId !== 'all') data.tab = tabId
    dispatch(updateTopicsLoading(true, tabId))
    return get('/topics', data)
      .then(topics => {
        dispatch(updateTopicsLoading(false, tabId))
        dispatch(updateTopics(topics, tabId))
      })
      .catch(() => {
        dispatch(updateTopicsLoading(false, tabId))
      })
  }
}

export function getUser(loginname) {
  return function(dispatch, getState) {
    let user = getState().users[loginname]
    if (typeof user !== 'undefined') return Promise.resolve(user)
    return get(`/users/${loginname}`)
      .then(user => {
        dispatch(updateUsers(user))
        return user
      })
  }
}

export function sign(token) {
  return function(dispatch) {
    return http
      .post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: token})
      .then(account => {
        dispatch(setToken(token))
        dispatch(setAccount(account))
      })
  }
}

export function updateCollects(collects) {
  return { type: UPDATE_COLLECTS, collects}
}

export function updateMessages(messages) {
  return { type: UPDATE_MESSAGES, messages}
}

export function updateTopicsTab(tab) {
  return { type: SET_TOPICS_TAB, tab }
}

export function updateTopicsLoading(loading, tabId) {
  return { type: TOGGLE_TOPICS_LOADING, loading, tabId }
}

export function updateTopic(topic) {
  return { type: UPDATE_TOPIC, topic}
}

export function updateTopics(topics, tabId) {
  return { type: UPDATE_TOPICS, topics, tabId }
}

export function updateUsers(user) {
  return { type: UPDATE_USERS, user }
}

export function setError(error) {
  return { type: SET_ERROR, error }
}

export function setToken(token) {
  return { type: SET_TOKEN, token }
}

export function setAccount(account) {
  return { type: SET_ACCOUNT, account }
}

export function toggleLoading(loading) {
  return { type: TOGGLE_LOADING, loading }
}

export function toggleNotFound(notFound) {
  return { type: TOGGLE_NOTFOUND, notFound }
}
