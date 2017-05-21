import Auth from '../components/Auth';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCollects} from '../redux/actions'
import {bindActionCreators} from 'redux'
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {truncate} from '../style-utils';
import Title from '../components/Title'

const TitleBox = styled.div`
  flex: 1;
  ${ truncate('100%') }
`
const Flex = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`
const AvatarBox = styled.div`
  margin-right: 16px;
`

class Collect extends Component {

  state = {
    loaded: false
  }

  componentWillMount() {
    const { props } = this
    if (
      Auth(props) &&
      !this.state.loaded &&
      props.collects.length === 0
    ) {
      props.actions.getCollects()
      this.setState({
        loaded: true
      })
    }
  }

  render() {
    return (
      <List>
        <Title>收藏的话题</Title>
        {this.props.collects.map(topic => <div key={topic.id}>
          <ListItem
            children={
              <Flex key={topic.id}>
                <AvatarBox>
                  <Link to={`/user/${topic.author.loginname}`} style={{display:'block'}}>
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
    );
  }
}

Collect.propTypes = {
  collects: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  collects: state.collects,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getCollects}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collect)