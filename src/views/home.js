import {getTopics, updateTopicsTab} from '../redux/actions'
import qs from 'qs'
import styled from 'styled-components';
import timeago from 'timeago.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {truncate} from '../style-utils';
import {Link} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const HomeScroll = styled.div`
  flex: 1;
  overflow-y: auto;
`
const CircularProgressBox = styled.div`
  text-align: center;
  padding: 20px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
`
const FlexItem = styled.div`
  flex: 1;
  align-items: center;
  padding: 0 10px 0 16px;
  font-size: 14px;
  width: calc(100% - 150px);
`
const PrimaryText = styled.div`
  ${ truncate('100%') }
  margin-bottom: 5px;
`
const MutedText = styled.div`
  color: rgba(0,0,0,.54);
`
const TimeagoBox = styled.div`
  color: rgba(0,0,0,.54);
  font-size: 14px;
  width: 62px;
  text-align: right;
`
const timeagoFormat = timeago().format

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    }
    this.scroll = this.scroll.bind(this);
  }

  updateTab() {
    const { actions, location, tab, tabs } = this.props;
    const tabId = location.search ?
      qs.parse(location.search.slice(1)).tab : 'all';
    if (tabId !== tab.id) {
      let tab = tabs.find(tab => tab.id === tabId)
      actions.updateTopicsTab(tab)
      if (tab.list.length === 0) actions.getTopics()
    }
  }

  componentWillMount() {
    this.updateTab()
  }

  componentDidUpdate(prevProps) {
    this.updateTab()
    if (this.props.location !== prevProps.location) {
      ReactDOM.findDOMNode(this.refs.homeScroll).scrollTop = 0
    }
  }

  scroll() {
    clearTimeout(this.state.timer)
    let target = ReactDOM.findDOMNode(this.refs.homeScroll)
    this.setState({
      timer: setTimeout(() => {
        let state = history.state || {}
        state.homeScrollTop = target.scrollTop
        history.replaceState(state, null)
        if (target.scrollTop === 0 ||
          target.scrollHeight - target.offsetHeight - target.scrollTop > 200) return
        this.props.actions.getTopics()
      }, 200)
    });
  }

  render() {
    return (
      <HomeBox>
        <Tabs
          onChange={tab => {
            this.props.history.push( tab !== 'all' ? `?tab=${tab}` : '' )
          }}
          value={this.props.tab.id || 'all'}
        >
          {this.props.tabs.map(tab => <Tab value={tab.id} label={tab.label} key={tab.id}/> )}
        </Tabs>
        <HomeScroll id="homeScroll" ref="homeScroll" onScroll={this.scroll}>
          <List>
            {this.props.tab.list.map((topic, index) => <div key={topic.id}>
              <ListItem
                children={
                  <Flex key={topic.id}>
                    <Link to={`/user/${topic.author.loginname}`}>
                    <Avatar alt={topic.author.loginname} src={topic.author.avatar_url} />
                    </Link>
                    <FlexItem onClick={() => {
                      this.props.history.push(`/topic/${topic.id}`)
                    }}>
                      <PrimaryText>{topic.title}</PrimaryText>
                      <MutedText>{topic.reply_count}/{topic.visit_count}</MutedText>
                    </FlexItem>
                    <TimeagoBox onClick={() => {
                      this.props.history.push(`/topic/${topic.id}`)
                    }}>{timeagoFormat(topic.last_reply_at, 'zh_CN')}</TimeagoBox>
                  </Flex>
                }
              />
              <Divider />
            </div>)}
            <CircularProgressBox>
              <CircularProgress/>
            </CircularProgressBox>
          </List>
        </HomeScroll>
      </HomeBox>
    );
  }
}

Home.propTypes = {
  tab: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  tab: state.topics.tab,
  tabs: state.topics.tabs
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getTopics, updateTopicsTab}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)