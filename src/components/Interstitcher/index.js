import React, { Component } from 'react'
import PropTypes from 'prop-types'

const historyExitingEventType = `history::exiting`

export default class Interstitcher extends Component {
  state = {
    pathname: '',
    exiting: false
  }

  listenerHandler = (event) => {
    console.log('Interstitcher: ', event.detail.pathname)
    this.setState({pathname: event.detail.pathname, exiting: true })
  }

  componentDidMount() {
    window.addEventListener(historyExitingEventType, this.listenerHandler)
  }

  componentWillUnmount() {
    window.removeEventListener(historyExitingEventType, this.listenerHandler)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ exiting: false, pathname: '' })
    }
  }

  render () {

    return (
      <div/>
    )
  }

}

