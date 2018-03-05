import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { EASE } from '../../utils/presets'

export default class Video extends Component {
  state = {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playing !== nextProps.playing) {
      if (nextProps.playing) {
        this.video.play()
        // this.video.playbackRate = 0.005
      } else {
        this.video.pause()
      }
    }
  }

  render () {

    const { blur, isVisible } = this.props

    let opacity
    if (isVisible) {
      opacity = 1
    } else {
      if (blur) {
        opacity = 0.3
      } else {
        opacity = 0
      }
    }

    return <video
      ref={ref => this.video = ref}
      css={{
        transition: `opacity 300ms ${EASE}, filter 600ms ${EASE}, top 600ms ${EASE}, right 600ms ${EASE}, bottom 600ms ${EASE}, left 600ms ${EASE}, width 600ms ${EASE}, height 600ms ${EASE}`,
        opacity: opacity,
        position: `fixed`,
        top: blur ? `-100px` : `0`,
        left: blur ? `-100px` : `0`,
        right: blur ? `-100px` : `0`,
        bottom: blur ? `-100px` : `0`,
        width: blur ? `calc(100% + 100px)` : `100%`,
        height: blur ? `calc(100% + 100px)` : `100%`,
        filter: blur ? `blur(50px)` : '',
        objectFit: `cover`,
        zIndex: `-1`,
        overflow: `hidden`,
      }}
      tabIndex='0'
      loop
      autoPlay
      webkit-playsinline
      type="video/mp4; codecs=&quot;h.264&quot;"
      src={`/video/output.mp4`}
    />
  }

}