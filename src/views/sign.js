import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setError, sign} from '../redux/actions'
import PropTypes from 'prop-types'
import qs from 'qs';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import Title from '../components/Title'

const SignBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 32px;
`
const SignForm = styled.form`
  width: 100%;
`
const ButtonText = styled.div`
  color: #fff;
`

class Sign extends Component {

  constructor(props) {
    super(props);
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  state = {
    hasLocalToken: false,
    token: ''
  }

  componentWillMount() {
    if (this.props.token) {
      this.redirect()
    } else {
      let token = localStorage.getItem('token')
      if (token) {
        this.setState({
          hasLocalToken: true
        })
        this.props.actions.sign(token)
          .then(() => {
            this.redirect()
          })
          .catch(() => {
            this.setState({
              hasLocalToken: false
            })
            localStorage.removeItem('token')
          })
      }
    }
  }

  redirect() {
    this.props.history.replace(
      qs.parse(
        this.props.location.search.slice(1)
      ).redirect || '/m'
    )
  }

  change(event) {
    this.setState({token: event.target.value});
  }

  submit() {
    let {token} = this.state
    let {actions} = this.props
    if (token === '') return actions.setError('Access Token 不能为空！')
    if (!/^[a-z\d\\-]{36}$/i.test(token)) return actions.setError('Access Token 格式错误！')
    actions.sign(token)
      .then(() => {
        localStorage.setItem('token', token)
        console.log(token)
        this.redirect()
      })
  }

  render() {
    if(this.state.hasLocalToken) return <div></div>
    return (
      <SignBox>
        <Title>登录</Title>
        <SignForm onSubmit={this.submit}>
        <TextField
          fullWidth
          autoFocus
          value={this.state.token}
          hintText="Access Token"
          onChange={this.change}
        />
        <RaisedButton onTouchTap={this.submit} primary fullWidth style={{}} children={
          <ButtonText>登录</ButtonText>
        }/>
        </SignForm>
      </SignBox>
    );
  }
}

Sign.propTypes = {
  token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({setError, sign}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign)