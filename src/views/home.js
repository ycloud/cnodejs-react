import * as homeActions from '../redux/actions'
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

  componentWillMount() {
    if(this.props.topics.list.length === 0) this.props.actions.getTopics()
  }

  scroll() {
    clearTimeout(this.state.timer)

    this.setState({
      timer: setTimeout(() => {
        let target = ReactDOM.findDOMNode(this.refs.homeScroll)
        // let state = history.state || {}
        // state.homeScrollTop = target.scrollTop
        // history.replaceState(state, null)
        if (this.props.loading ||
          target.scrollTop === 0 ||
          target.scrollHeight - target.offsetHeight - target.scrollTop > 200) return
        this.props.actions.getTopics()
      }, 200)
    });
  }

  render() {
    return (
      <HomeBox>
        <Tabs>
          {this.props.tabs.map(tab => <Tab label={tab.label} key={tab.id}/> )}
        </Tabs>
        <HomeScroll ref="homeScroll" onScroll={this.scroll}>
          <List>
            {this.props.topics.list.map((topic, index) => <div key={topic.id}>
              <ListItem
                children={
                  <Flex key={topic.id}>
                    <Avatar alt={topic.author.loginname} src={topic.author.avatar_url} />
                    <FlexItem>
                      <PrimaryText>{topic.title}</PrimaryText>
                      <MutedText>{topic.reply_count}/{topic.visit_count}</MutedText>
                    </FlexItem>
                    <TimeagoBox>{timeagoFormat(topic.last_reply_at, 'zh_CN')}</TimeagoBox>
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
  loading: PropTypes.bool.isRequired,
  tabs: PropTypes.array.isRequired,
  topics: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loading: state.loading,
  tabs: state.topics.tabs,
  topics: state.topics.tabs.find(tab => tab.id === state.topics.tab)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)