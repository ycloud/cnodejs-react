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

export const SET_ERROR = 'SET_ERROR'
export const SET_MODULE = 'SET_MODULE'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_TOPICS_TAB = 'SET_TOPICS_TAB'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const TOGGLE_NOTFOUND = 'TOGGLE_NOTFOUND'
export const UPDATE_COLLECTS = 'UPDATE_COLLECTS'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const UPDATE_TOPIC = 'UPDATE_TOPIC'
export const UPDATE_TOPICS = 'UPDATE_TOPICS'
export const UPDATE_TOPICS_LOADING = 'UPDATE_TOPICS_LOADING'
export const UPDATE_TOPICS_TAB = 'UPDATE_TOPICS_TAB'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USERS = 'UPDATE_USERS'

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

export function updateTopicsTab(tab) {
  return { type: UPDATE_TOPICS_TAB, tab }
}

export function updateTopicsLoading(loading, tabId) {
  return { type: UPDATE_TOPICS_LOADING, loading, tabId }
}

export function updateTopics(topics, tabId) {
  return { type: UPDATE_TOPICS, topics, tabId }
}

export function setError(error) {
  return { type: SET_ERROR, error }
}

export function setToken(token) {
  return { type: SET_TOKEN, token }
}

export function toggleLoading(loading) {
  return { type: TOGGLE_LOADING, loading }
}

export function toggleNotFound(notFound) {
  return { type: TOGGLE_NOTFOUND, notFound }
}
