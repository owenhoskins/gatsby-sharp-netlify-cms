import React, { Component } from 'react'
import Lightbox from 'react-images'

import { Grid, Row, Col } from '../Grid'
import Img from '../Image'
import Video from '../Video'
import Menu from '../Menu'

const Model = ({portfolios, videos, instagram, biography, image}) => {

  const sections = portfolios.map(portfolio => {
    return {
      title: portfolio.title,
      count: portfolio.gallery.length
    }
  })

  if (videos.length > 0) {
    sections.push({title: 'Videos', count: videos.length})
  }

  if (instagram.length > 0) {
    sections.push({title: 'Instagram', count: instagram.length})
  }

  if (biography.length > 0) {
    sections.push({title: 'Biography', count: 1})
  }

  return (
    <Desktop
      sections={sections}
      portfolios={portfolios}
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
    currentImage: 0,
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const { portfolios, sections = [], views = [], title } = this.props
    const images = []
    return (
      <Grid>
        <Row>
          <Col xs={ 3 }>
            Menu
          </Col>
          <Col xs={ 9 }>
            <h1>
              {title}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={ 3 }>
            <Menu sections={sections} />
          </Col>
          <Col xs={ 9 }>
            {
              portfolios && portfolios.map((portfolio, index) => {
                return (
                  <div
                    key={index}
                    css={{
                      marginBottom: '20rem',
                      textAlign: 'center'
                    }}
                  >
                  {
                    portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                    if (image && image.childImageSharp) {
                      const { childImageSharp: { sizes }} = image
                      const { aspectRatio, src, srcSet } = sizes
                      images.push({src, srcSet: srcSet.split(',')})
                      return (
                        <div
                          key={index}
                          css={{
                            position: 'relative',
                            display: 'inline-block',
                            minWidth: 'auto',
                            margin: '0 15px 30px'
                          }}
                          onClick={(evt) => this.openLightbox(evt, {index: index})}
                        >
                          <Img
                            outerCss={{ width: 260 * aspectRatio + 'px' }}
                            innerCss={{
                              width: 'auto',
                              height: '260px'
                            }}
                            sizes={sizes}
                          />
                        </div>
                        )
                      }
                    })
                  }
                  </div>
                )
              })
            }
            <Lightbox images={images}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Model
