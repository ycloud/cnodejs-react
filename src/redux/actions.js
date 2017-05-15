import axios from 'axios'

const http = axios.create({
  baseURL: 'https://share.la/cnodejs'
})
const get = (url, data) => http.get(url, {
  params: data
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
  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(toggleLoading(true))

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

    return get('/topics').then(res => {
      dispatch(toggleLoading(false))
      dispatch(updateTopics(res.data))
    })

      // 在实际应用中，还需要
      // 捕获网络请求的异常。
  }
}

export function updateTopics(topics) {
  return { type: UPDATE_TOPICS, topics }
}

export function setToken(token) {
  return { type: SET_TOKEN, token }
}

export function toggleLoading(loading) {
  return { type: TOGGLE_LOADING, loading }
}