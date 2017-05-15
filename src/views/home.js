import * as homeActions from '../redux/actions'
import styled from 'styled-components';
import timeago from 'timeago.js';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {truncate} from '../style-utils';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

const CircularProgressBox = styled.div`
  text-align: center;
  padding: 20px;
`
const Flex = styled.div`
  display: flex;
`
const FlexItem = styled.div`
  flex: 1;
  padding: 0 10px 0 16px;
  font-size: 14px;
  width: calc(100% - 150px);
`
const PrimaryText = styled.div`
  ${ truncate('100%') }
`
const MutedText = styled.div`
  color: rgba(0,0,0,.54);
`
const TimeagoBox = styled.div`
  color: rgba(0,0,0,.54);
  font-size: 14px;
  width: 62px;
`
const timeagoFormat = timeago().format

class Home extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="全部" >
          </Tab>
          <Tab label="精华" >
          </Tab>
          <Tab label="分享" >
          </Tab>
        </Tabs>
        <List onClick={this.props.actions.getTopics}>
        {this.props.topics.map((topic, index) => <div key={topic.id}>
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
      </div>
    );
  }
}

Home.propTypes = {
  topics: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  topics: state.topics
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(homeActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)