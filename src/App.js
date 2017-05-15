import routes from './routes';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import {media} from './style-utils';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Link, Route, Switch} from 'react-router-dom'

const navs = [
  {
    icon: 'home',
    module: 'Home',
    label: '话题',
    to: '/topic'
  },
  {
    icon: 'favorite',
    module: 'Collect',
    label: '收藏',
    to: '/collect'
  },
  {
    icon: 'notifications',
    module: 'Message',
    label: '消息',
    to: '/message'
  },
  {
    icon: 'person',
    module: 'Me',
    label: '我',
    to: '/m'
  }
];
const AppBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const AppBarBox = styled.div`
  display: none;
  ${ media.handheld`
    display: block;
  ` }
`
const BottomNavigationBox = styled.div`
  order: 9;
  ${ media.handheld`
    display: none;
  ` }
`
const RouterBox = styled.div`
  flex: 1;
  overflow-y: auto;
`
const LinearProgressBox = styled.div`

`
const LinearProgressStyle = {
  background: 'rgba(255, 255, 255, 0.618)',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 9
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBox>
          <AppBarBox>
            <Paper zDepth={1}>
              <AppBar
                title="cnodejs react share.la"
                showMenuIconButton={false}
                children={
                  navs.map(nav => <Link key={nav.to} to={nav.to}>{nav.label}</Link>)
                }
              />
            </Paper>
          </AppBarBox>
          <BottomNavigationBox>
            <Paper className="bottom-nav" zDepth={1}>
              <BottomNavigation selectedIndex={0}>
                {navs.map(nav => <BottomNavigationItem
                  key={nav.to}
                  label={nav.label}
                  icon={
                    <FontIcon className="material-icons">{nav.icon}</FontIcon>
                  }
                  />)}
              </BottomNavigation>
            </Paper>
          </BottomNavigationBox>
          <RouterBox>
            <Switch>
              {routes.map(route => <Route exact key={route.path} {...route}/>)}
            </Switch>
          </RouterBox>
          <LinearProgress mode="indeterminate" style={LinearProgressStyle}/>
        </AppBox>
      </MuiThemeProvider>
    );
  }
}

export default App;
