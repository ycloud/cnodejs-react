import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store