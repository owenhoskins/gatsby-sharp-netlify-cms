import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { YELLOW, PURPLE, EASE } from '../../utils/presets'

import Video from './Video'

function returnState(props) {

  let opacity
  let playing
  let blur
  let base64Opacity = 0

  if (
    props.page === 'home' ||
    props.page === 'agency' ||
    props.page === 'services'
  ) {

    if (props.page === 'home') {

      // home page only
      playing = true
      if (!props.collapsed) { // if collapsed is not false
        blur = true
        opacity = 0.6
      } else {
        opacity = 1
        blur = false
      }

    } else {

      // services & agency
      opacity = 0.8
      blur = true
      playing = true

    }

  } else {

    // artists pages
    opacity = 0
    base64Opacity = 0.3

    if (props.page === 'artist') {
      if (props.isCover) {
        base64Opacity = 0
      } else {
        base64Opacity = 1
      }
    }

  }

  return {
    opacity,
    playing,
    blur,
    base64Opacity
  }

}


export default class Background extends Component {

  state = {
    blur: false,
    playing: false,
    opacity: 1,
    base64: 0
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
      <div
        css={{
          opacity: this.state.base64Opacity,
          transition: `opacity 300ms ${EASE}`,
          backgroundImage: `url(${this.props.base64})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          filter: `blur(50px)`,
          transform: `scale(1.1)`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: `absolute`
        }}
      />
      <Video {...this.state} />
    </div>
  }

}

