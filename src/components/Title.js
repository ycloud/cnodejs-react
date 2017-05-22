import { Component } from 'react'
class Title extends Component {
  componentWillMount() {
    this.updateTitle()
  }

  updateTitle(props) {
    const { children } = props || this.props
    const { title } = document
    if (children !== title) document.title = children
  }

  componentWillReceiveProps(nextProps) {
    this.updateTitle(nextProps)
  }

  render() {
    return null
  }
}

export default Title
