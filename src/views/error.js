import * as errorActions from '../redux/actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

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
        404 Not Found
      </h1>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(errorActions, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Error);