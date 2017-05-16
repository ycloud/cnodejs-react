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

export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_MODULE = 'SET_MODULE'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_TOPICS_TAB = 'SET_TOPICS_TAB'
export const UPDATE_COLLECTS = 'UPDATE_COLLECTS'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const UPDATE_TOPIC = 'UPDATE_TOPIC'
export const UPDATE_TOPICS = 'UPDATE_TOPICS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USERS = 'UPDATE_USERS'

export function getTopics() {
  return function (dispatch, getState) {
    let state = getState()
    let data = {
      page: state.topics.tabs.find(tab => tab.id === state.topics.tab).page
    }
    if (state.topics.tab !== 'all') data.tab = state.tab
    return get('/topics', data).then(topics => {
      dispatch(updateTopics(topics))
    })
  }
}

export function updateTopics(topics) {
  return { type: UPDATE_TOPICS, topics }
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