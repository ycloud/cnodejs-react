import {getTopic, setError} from '../redux/actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Divider from 'material-ui/Divider';
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import timeago from 'timeago.js';
import marked from 'marked'
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

const timeagoFormat = time => timeago().format(time, 'zh_CN')

const ListBox = styled.div`
  margin: 0 -16px;
`
const SubBox = styled.div`
  padding-top: 10px;
`
const ItemBox = styled.div`
  font-size: 14px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
`
const ReplyAuthor = styled.div`
  flex: 1;
  margin-left: 16px;
`
const iconStyle = {
  fontSize: '16px',
  color: 'rgba(0,0,0,.54)',
  margin: '-3px 2px 0 0'
}
const LikeCount = styled.span`
  width: 16px;
  overflow: hidden;
`

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: {}
    };
  }

  componentWillMount() {
    let {match, actions} = this.props
    let {id} = match.params
    if (/^[a-z\d]{24}$/i.test(id)) {
      actions.getTopic(id)
        .then(topic => {
          this.setState({
            topic
          })
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      actions.setError('非法操作')
    }
  }

  render() {
    return this.state.topic.id ? (
      <div>
        <Card>
          <CardTitle title={this.state.topic.title} subtitle={
            <SubBox>
              <Link to={`/user/${this.state.topic.author.loginname}`}>{this.state.topic.author.loginname}</Link> {timeagoFormat(this.state.topic.create_at)} 发表 |
              {this.state.topic.visit_count}次浏览
            </SubBox>
          } />
          <CardText>
            <div dangerouslySetInnerHTML={{__html: marked(this.state.topic.content)}}></div>
          </CardText>
        </Card>
        <br/>
        <Card>
          <CardHeader
            title={`${this.state.topic.reply_count}回复`}
          />
          <CardText>
            <ListBox>
            <List>
              {this.state.topic.replies.map(reply => <div key={reply.id}>
                <ListItem
                  children={
                    <ItemBox key={reply.id}>
                      <Flex>
                      <Link to={`/user/${reply.author.loginname}`}>
                      <Avatar alt={reply.author.loginname} src={reply.author.avatar_url} />
                      </Link>
                      <ReplyAuthor>{reply.author.loginname} {timeagoFormat(reply.create_at)}
                      </ReplyAuthor>
                      <FontIcon style={iconStyle} className="material-icons">thumb_up</FontIcon>
                      <LikeCount>{ reply.ups.length ? reply.ups.length : '' }</LikeCount>
                      </Flex>
                      <div dangerouslySetInnerHTML={{__html: marked(reply.content)}}></div>
                    </ItemBox>
                  }
                />
                <Divider />
              </div>)}
            </List>
            </ListBox>
          </CardText>
        </Card>
      </div>
    ) : <div></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getTopic, setError}, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Show)