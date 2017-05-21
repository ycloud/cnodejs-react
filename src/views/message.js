import Auth from '../components/Auth';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getMessages} from '../redux/actions'
import {bindActionCreators} from 'redux'
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import marked from 'marked'
import Title from '../components/Title'

const ListBox = styled.div`
  margin-top: -8px;
  flex: 100%;
`

const MessageBox = styled.div`
  font-size: 14px;
  line-height: 20px;
`
const MessageContent = styled.div`
  color: rgba(0, 0, 0, .54);
`

class Message extends Component {

  state = {
    activeId: null,
    loaded: false
  }

  componentWillMount() {
    const { props } = this
    if (
      Auth(props) &&
      !this.state.loaded &&
      props.messages.length === 0
    ) {
      props.actions.getMessages()
      this.setState({
        loaded: true
      })
    }
  }

  render() {
    return (
      <ListBox onClick={() =>{
        this.setState({
          activeId: null
        })
      }}>
      <Title>收到的消息</Title>
      <List>
        {this.props.messages.map(message => <Paper
          zDepth={this.state.activeId !== message.id ? 1 : 2}
          key={message.id}
          onClick={(event) =>{
            this.setState({
              activeId: message.id
            })
            event.stopPropagation()
          }}
          style={{
            transition: 'margin .3s cubic-bezier(.55,0,.55,.2)',
            margin: this.state.activeId !== message.id ? 0 : '16px 0'
          }}
        >
          <ListItem
            children={
              <MessageBox key={message.id}>
                <Link to={`/user/${message.author.loginname}`}>{message.author.loginname}</Link> 在话题
                <Link to={`/topic/${message.topic.id}`}>{message.topic.title}</Link> 中@了你
                {this.state.activeId !== message.id || <MessageContent dangerouslySetInnerHTML={{__html: marked(message.reply.content)}} />}
              </MessageBox>
            }
          />
          <Divider />
        </Paper>)}
      </List>
      </ListBox>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  messages: state.messages,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getMessages}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)