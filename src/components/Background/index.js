import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { YELLOW, PURPLE, EASE } from '../../utils/presets'

import Video from './Video'

function returnState(props) {

  let opacity
  let playing
  let blur

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
      opacity = 0.6
      blur = true
      playing = false

    }

  } else {

    // artists pages
    opacity = 0

  }

  return {
    opacity,
    playing,
    blur
  }

}

export default class Background extends Component {

  state = {
    blur: false,
    playing: false,
    opacity: 1
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
      <Video {...this.state} />
    </div>
  }

}

