import {getUser} from '../redux/actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Divider from 'material-ui/Divider';
import {Card, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import timeago from 'timeago.js';
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import {truncate} from '../style-utils';
const timeagoFormat = time => timeago().format(time, 'zh_CN')

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`
const LoginnameBox = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
`
const UserInfo = styled.div`
  flex: 1;
`
const Flex = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`
const SubBox = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, .54);
`
const AvatarBox = styled.div`
  margin-right: 16px;
`
const TitleBox = styled.div`
  ${ truncate('calc(100%-56px)') }
`

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    let {match, actions} = this.props
    let {loginname} = match.params
    actions.getUser(loginname)
      .then(user => {
        this.setState({
          user
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return this.state.user.loginname ? (
      <div>
        <Card>
        <HeaderBox>
          <UserInfo>
            <LoginnameBox>{this.state.user.loginname}</LoginnameBox>
            <SubBox>{this.state.user.score}积分 注册于 {timeagoFormat(this.state.user.create_at)}</SubBox>
          </UserInfo>
          <Avatar alt={this.state.user.loginname} size={64} src={this.state.user.avatar_url} />
        </HeaderBox>
        </Card>
        <br/>
        <Card>
          <CardHeader
            title="最近创建的话题"
          />
          <List>
            {this.state.user.recent_topics.map(topic => <div key={topic.id}>
              <ListItem
                children={
                  <Flex key={topic.id}>
                    <TitleBox>
                    <Link to={`/topic/${topic.id}`}>
                    {topic.title}
                    </Link>
                    </TitleBox>
                  </Flex>
                }
              />
              <Divider />
            </div>)}
          </List>
        </Card>
        <br/>
        <Card>
          <CardHeader
            title="最近参与的话题"
          />
          <List>
            {this.state.user.recent_replies.map(topic => <div key={topic.id}>
              <ListItem
                children={
                  <Flex key={topic.id}>
                    <AvatarBox>
                    <Link to={`/user/${topic.author.loginname}`}>
                    <Avatar alt={topic.author.loginname} src={topic.author.avatar_url} />
                    </Link>
                    </AvatarBox>
                    <TitleBox>
                    <Link to={`/topic/${topic.id}`}>
                    {topic.title}
                    </Link>
                    </TitleBox>
                  </Flex>
                }
              />
              <Divider />
            </div>)}
          </List>
        </Card>
      </div>
    ) : <div></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getUser}, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(User)