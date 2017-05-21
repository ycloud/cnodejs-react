import {toggleNotFound} from '../redux/actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Title from '../components/Title'

class Error extends Component {

  componentWillMount() {
    this.props.actions.toggleNotFound(true)
  }

  componentWillUnmount() {
    this.props.actions.toggleNotFound(false)
  }

  render() {
    return (
      <h1>
        <Title>404 Not Found</Title>
        404 Not Found
      </h1>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({toggleNotFound}, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Error);