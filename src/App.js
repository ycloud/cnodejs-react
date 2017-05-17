import routes from './routes';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {media} from './style-utils';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {NavLink, Route, Switch} from 'react-router-dom'

const navs = [
  {
    icon: 'home',
    module: 'Home',
    label: '话题',
    to: '/'
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
  `}
`
const NavLinkStyle = 'nav-link'
const BottomNavigationBox = styled.div`
  order: 9;
  ${ media.handheld`
    display: none;
  `}
`
const RouterBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`
const LinearProgressStyle = {
  background: 'rgba(0, 188, 212,.618)',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 9
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: null
    }
    this.link = this.link.bind(this);
    this.popstate = this.popstate.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  link (event) {
    let href = event.target.getAttribute('href')
    if (href === null) return
    if (href.startsWith('/user/')) {
      event.preventDefault()
      this.props.history.push(href)
    }
    if (!href.startsWith('/')) {
      event.preventDefault()
      open(href)
    }
  }

  popstate (event) {
    let state = event.state
    if (state === null) return
    if (state.scrollTop) ReactDOM.findDOMNode(this.refs.routerScroll).scrollTop=state.scrollTop
    if (state.homeScrollTop) document.getElementById('homeScroll').scrollTop=state.homeScrollTop
  }

  scroll() {
    clearTimeout(this.state.timer)
    this.setState({
      timer: setTimeout(() => {
        let target = ReactDOM.findDOMNode(this.refs.routerScroll)
        let state = history.state || {}
        state.scrollTop = target.scrollTop
        history.replaceState(state, null)
      }, 200)
    });
  }

  componentWillMount() {
    window.addEventListener('popstate', this.popstate)
  }

  componentDidMount() {
    document.getElementById('routerScroll')
      .addEventListener('click', this.link)
  }

  componentWillUnmount() {
    window.addEventListener('popstate', this.popstate)
    document.getElementById('routerScroll')
      .addEventListener('click', this.link)
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBox>
          {this.props.notFound || (
            <AppBarBox>
              <Paper zDepth={1}>
                <AppBar
                  title="cnodejs react share.la"
                  showMenuIconButton={false}
                  children={
                    <div className={NavLinkStyle}>
                      {navs.map(nav => <NavLink
                        key={nav.to}
                        to={nav.to}
                        >{nav.label}</NavLink>)}
                    </div>
                  }
                />
              </Paper>
            </AppBarBox>
          )}
          {this.props.notFound || (
            <BottomNavigationBox>
              <Paper className="bottom-nav" zDepth={1}>
                <BottomNavigation selectedIndex={0}>
                  {navs.map(nav => <BottomNavigationItem
                    key={nav.to}
                    label={nav.label}
                    icon={
                      <FontIcon className="material-icons">{nav.icon}</FontIcon>
                    }
                    onClick={() => {
                      this.props.history.push(nav.to)
                    }}
                    />)}
                </BottomNavigation>
              </Paper>
            </BottomNavigationBox>
          )}
          <RouterBox id="routerScroll" ref="routerScroll" onScroll={this.scroll}>
            <Switch>
              {routes.map(route => <Route exact key={route.path} {...route}/>)}
            </Switch>
          </RouterBox>
          {!this.props.loading || <LinearProgress color="rgba(255, 255, 255, 0.618)" mode="indeterminate" style={LinearProgressStyle}/>}
        </AppBox>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  loading: state.loading,
  notFound: state.notFound,
  token: state.token
})

export default connect(
  mapStateToProps
)(App)
