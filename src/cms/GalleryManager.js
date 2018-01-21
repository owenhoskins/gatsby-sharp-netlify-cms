import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImageCanvas extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.prepareCanvas(this.props.src)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.prepareCanvas(nextProps.src)
    }
  }

  prepareCanvas = (src) => {
    const self = this
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = src
    image.onload = function(event){
      const aspectRatio = image.width / image.height
      canvas.width = aspectRatio * 210
      canvas.height = 210
      console.log('aspectRatio, width: ', aspectRatio, ctx.width, ctx.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

  }

  render() {
    return (
      <canvas
        ref={ (ref) => this.canvas = ref }
        style={{
          display: 'inline-block',
          margin: '15px',
          cursor: 'pointer'
        }}
      />
    )
  }
}

export const GalleryPreview = ({ value, getAsset }) => {

  const images = []
  value.forEach(function(val, index) {
    const src = val.getIn(['image'])
    const asset = getAsset(src)
    if (asset) {
      images.push(asset.path)
    }
  })

  console.log('images: ', images)

  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      {
        images.length > 0 && images.map(image =>
        <ImageCanvas
          key={ image }
          src={ image }
        />
      )
    }
    </div>
  )
}

GalleryPreview.propTypes = {
  value: PropTypes.node,
};
