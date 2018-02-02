import React, { Component } from 'react'

import Img from '../Image'
import Video from '../Video'

const Model = ({portfolios, videos, instagram, biography, image}) => {

  return (
    <Desktop
    />
  )
}

/*
const renderImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        float: 'left',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}*/

class Desktop extends Component {
  state = {
  }

  render() {
    const { sections = [], views = [] } = this.props
    return (
      <div/>
    )
  }

}

export default Model
