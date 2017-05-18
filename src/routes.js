import React from 'react';
import Bundle from './components/Bundle';
import Home from './views/home'
import Show from 'bundle-loader?lazy!./views/show';
import User from 'bundle-loader?lazy!./views/user';
import Sign from 'bundle-loader?lazy!./views/sign';
import Collect from 'bundle-loader?lazy!./views/collect';
import Message from 'bundle-loader?lazy!./views/message';
import Error from 'bundle-loader?lazy!./views/error';

const ShowRouter = (props) => (
  <Bundle load={Show}>
    {(ShowRouter) => <ShowRouter {...props}/>}
  </Bundle>
)

const UserRouter = (props) => (
  <Bundle load={User}>
    {(UserRouter) => <UserRouter {...props}/>}
  </Bundle>
)

const SignRouter = (props) => (
  <Bundle load={Sign}>
    {(SignRouter) => <SignRouter {...props}/>}
  </Bundle>
)

const CollectRouter = (props) => (
  <Bundle load={Collect}>
    {(CollectRouter) => <CollectRouter {...props}/>}
  </Bundle>
)

const MessageRouter = (props) => (
  <Bundle load={Message}>
    {(MessageRouter) => <MessageRouter {...props}/>}
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
    path: '/topic/:id',
    component: ShowRouter
  },
  {
    path: '/user/:loginname',
    component: UserRouter
  },
  {
    path: '/sign',
    component: SignRouter
  },
  {
    path: '/collect',
    component: CollectRouter
  },
  {
    path: '/message',
    component: MessageRouter
  },
  {
    path: '/m',
    component: UserRouter
  },
  {
    path: '*',
    component: ErrorRouter
  }
]