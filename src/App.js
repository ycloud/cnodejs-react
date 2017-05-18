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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {setError} from './redux/actions'
import {bindActionCreators} from 'redux';

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
    this.link = this.link.bind(this);
    this.popstate = this.popstate.bind(this);
    this.scroll = this.scroll.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
  }

  state = {
    navActive: 0,
    timer: null
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

  componentWillUpdate({location}) {
    if (this.props.location !== location) {
      ReactDOM.findDOMNode(this.refs.routerScroll).scrollTop = 0
      let navActive = navs.findIndex(nav => nav.to === location.pathname)
      this.setState({
        navActive: navActive > -1 ? navActive : 0
      })
    }
  }

  componentWillUnmount() {
    window.addEventListener('popstate', this.popstate)
    document.getElementById('routerScroll')
      .addEventListener('click', this.link)
  }

  dialogClose() {
    this.props.actions.setError('')
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
                      {navs.map((nav, index) => <NavLink
                        key={nav.to}
                        to={nav.to}
                        isActive= {() => index === this.state.navActive}
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
                <BottomNavigation selectedIndex={this.state.navActive}>
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
          <Dialog
            actions={
              <FlatButton
                primary
                label="我知道了"
                style={{}}
                onTouchTap={this.dialogClose}
              ></FlatButton>
            }
            open={!!this.props.error}
            style={{}}
            onRequestClose={this.dialogClose}
          >{this.props.error}</Dialog>
        </AppBox>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  error: state.error,
  loading: state.loading,
  notFound: state.notFound
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({setError}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
