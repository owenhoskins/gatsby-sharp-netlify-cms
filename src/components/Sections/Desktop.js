import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import Img from '../Image'
import Video from '../Video'

import {
  HeaderLG,
  HeaderSM
} from '../Styled'

import { Grid, Row, Col } from '../Grid'

import Gallery from '../Gallery'

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
        //float: 'left',
        display: 'inline-block',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}

export class Portfolios extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.portfolios.length !== nextProps.portfolios.length) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      portfolios,
      sections,
      returnRef,
      onPositionChange,
      openLightbox,
      //onClose,
      //onClickPrev,
      //onClickNext,
      //currentImage,
      //isOpen,
    } = this.props
    //console.log("Portfolios render method called!")

    const images = []

    return (
      <div>
        {
          portfolios && portfolios.map((portfolio, index) => {
            const refKey = sections[index].key
            const photos = []
            return (
              <Waypoint
                onPositionChange={(props) => onPositionChange(props, refKey) }
                key={index}
                ref={ (ref) => returnRef(ref, refKey) }
                topOffset={-50}
                botttomOffset={-50}
              >
                <div
                  css={{
                    paddingTop: '5rem',
                    marginBottom: '10rem',
                    textAlign: 'center'
                  }}
                >
                {
                  portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                    if (image && image.childImageSharp) {
                      const { childImageSharp: { sizes }} = image
                      const { aspectRatio, src, srcSet } = sizes
                      const srcSetArray = srcSet.split(',')
                      sizes.sizes = '500px'
                      images.push(src)
                      photos.push({
                        width: aspectRatio,
                        height: 1,
                        src,
                        srcSet: srcSetArray,
                        sizes: [sizes.sizes],
                        originalSizes: sizes,
                        imageIndex: images.length - 1
                      })
                    }
                  })
                }
                <Gallery
                  margin={16}
                  columns={4}
                  ImageComponent={renderImage}
                  photos={photos}
                  onClick={openLightbox}
                />
                </div>
              </Waypoint>
            )
          })
        }
      </div>
    )
  }

}

export class Videos extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.videos.length !== nextProps.videos.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Videos`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Videos`)
    }
  }

  render() {
    const {
      videos
    } = this.props
    //console.log("Videos render method called!")

    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            paddingTop: '5rem',
            paddingBottom: '10rem',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '40rem'
          }}
        >
        {
          videos.map((video, index) =>
            <Video
              key={index}
              url={`https://vimeo.com/${video.id}`}
              poster={video.poster}
              title={video.name}
              ratio={video.ratio}
              style={{
                margin: '0 0rem 3rem',
              }}
            />
          )
        }
        </div>
      </Waypoint>
    )
  }
}

export class Instagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.instagram.length !== nextProps.instagram.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Instagram`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Instagram`)
    }
  }

  render() {
    const {
      instagram,
      biography
    } = this.props
    //console.log("Instagram render method called!")


    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            paddingTop: '5rem',
            paddingBottom: '10rem',
            textAlign: 'center'
          }}
        >
        <div css={{margin: '5rem 0 5rem'}}>
          <HeaderLG blur uppercase>
            <a href={`https://instagram.com/${biography.instagram}`} target='_blank'>{`${biography.instagram}`}</a>
          </HeaderLG>
          <HeaderSM>
            {`${biography.followers} followers`}
          </HeaderSM>
        </div>
        {
          //     instagram.map(photo => views.push({ instagram: { src: photo.node.media }}))

          instagram.map((photo, index) =>
            <div
              key={index}
              css={{
                position: 'relative',
                display: 'inline-block',
                minWidth: 'auto',
                margin: '0 5px 5px',
                width: '256px',
                textAlign: 'center',
                fontSize: 0,
                //border: '1px solid rgba(238, 238, 238, 0.2)'
              }}
            >
              <Img
                style={{
                  width: '256px',
                  height: '256px',
                  marginBottom: 0
                }}
                // src={photo.node.media}
                customAspect={{ height: '256px' }}
                objectPosition={'center center'}
                objectFit={'cover'}
                sizes={{ src: photo.node.media }}
              />
            </div>
          )
        }
        </div>
      </Waypoint>
    )
  }
}

export class Biography extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.biography.length !== nextProps.biography.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Biography`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Biography`)
    }
  }

  render() {
    const {
      biography
    } = this.props
    //console.log("Biography render method called!")


    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            maxWidth: '33rem',
            margin: '0 auto'
          }}
          dangerouslySetInnerHTML={{ __html: biography.text }}
        />
      </Waypoint>
    )
  }
}



