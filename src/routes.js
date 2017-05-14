import React from 'react';
import Bundle from './components/Bundle';
import Home from './views/home'
import Show from 'bundle-loader?lazy!./views/show'
import Error from 'bundle-loader?lazy!./views/error'

const ShowRouter = (props) => (
  <Bundle load={Show}>
    {(ShowRouter) => <ShowRouter {...props}/>}
  </Bundle>
)

const ErrorRouter = (props) => (
  <Bundle load={Error}>
    {(ErrorRouter) => <ErrorRouter {...props}/>}
  </Bundle>
)


export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/topic',
    component: ShowRouter
  },
  {
    path: '*',
    component: ErrorRouter
  }
]