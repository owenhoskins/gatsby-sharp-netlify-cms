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

    const { blur, opacity } = this.props

    return <video
      ref={ref => this.video = ref}
      css={{
        //transition: `opacity 300ms ${EASE}, filter 600ms ${EASE}, top 600ms ${EASE}, right 600ms ${EASE}, bottom 600ms ${EASE}, left 600ms ${EASE}, width 600ms ${EASE}, height 600ms ${EASE}`,
        opacity: opacity,
        position: `fixed`,
        //top: blur ? `-100px` : `0`,
        //left: blur ? `-100px` : `0`,
        //right: blur ? `-100px` : `0`,
        //bottom: blur ? `-100px` : `0`,
        //filter: blur ? `blur(50px)` : '',
        width: `100%`,
        height: `100%`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        objectFit: `cover`,
        filter: blur ? 'blur(50px)' : 'blur(0)',
        transition: `600ms opacity ${EASE}, 600ms filter ${EASE}, transform 600ms ${EASE}`,
        transform: blur ? `scale(1.1)` : `scale(1)`,
        zIndex: `-1`,
        overflow: `hidden`,
      }}
      tabIndex='0'
      loop
      autoPlay
      webkit-playsinline="true"
      type="video/mp4; codecs=&quot;h.264&quot;"
      src={`/video/output.mp4`}
    />
  }

}