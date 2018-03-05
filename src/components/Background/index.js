import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { YELLOW, PURPLE, EASE } from '../../utils/presets'

import Video from './Video'

function returnState(props) {

  let isVisible
  let isBlur
  let isPlaying

  if (
    props.page === 'home' ||
    props.page === 'agency' ||
    props.page === 'services'
  ) {
    isVisible = true
  } else {
    isVisible = false
  }

  if (props.page === 'home') {
    isPlaying = true

    if (!props.collapsed) {
      isBlur = true
    } else {
      isBlur = false
    }

  } else {
    isBlur = true
  }

  return {
    isPlaying,
    isBlur,
    isVisible
  }

}

export default class Background extends Component {

  state = {
    isVisible: false,
    isBlur: false,
    isPlaying: false
  }

  constructor(props){
    super(props)

    this.state = {
      ...returnState(props)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (
      this.props.page !== nextProps.page ||
      this.props.collapsed !== nextProps.collapsed
    ) {

      this.setState({
        ...returnState(nextProps)

      })

    }

  }

  render () {

    return <div
      css={{
        position: `fixed`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -2,
        transition: `background 500ms ${EASE}`,
        backgroundColor: this.props.backgroundColor,
      }}
    >
      <Video
        blur={this.state.isBlur}
        isVisible={this.state.isVisible}
        playing={this.state.isPlaying}
      />
    </div>
  }

}

