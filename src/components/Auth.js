import qs from 'qs';

const Auth = props => {
  if (props.token === '') {
    let redirect = props.location.pathname
    redirect = qs.stringify({ redirect })
    props.history.replace(`/sign?${redirect}`)
    return false
  }
  return true
}

export default Auth
