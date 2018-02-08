import React, { Component } from 'react'
import Lightbox from 'react-images'
import Waypoint from 'react-waypoint'

import ScrollTo from '../ScrollTo'
import { Grid, Row, Col } from '../Grid'
import Img from '../Image'
import Video from '../Video'
import Menu from '../Menu'

const Model = ({portfolios = [], videos = [], instagram = [], biography, image}) => {

  const sections = portfolios.map(portfolio => {
    return {
      title: portfolio.title,
      key: portfolio.title.replace(/ /g, ''),
      count: portfolio.gallery.length
    }
  })

  if (videos && videos.length > 0) {
    sections.push({title: 'Videos', key: 'Videos', count: videos.length})
  }

  if (instagram && instagram.length > 0) {
    sections.push({title: 'Instagram', key: 'Instagram', count: instagram.length})
  }

  if (biography && biography.length > 0) {
    sections.push({title: 'Biography', key: 'Biography', count: 1 })
  }

  return (
    <Desktop
      sections={sections}
      portfolios={portfolios}
      videos={videos}
      instagram={instagram}
      biography={{
        text: biography,
        image: image
      }}
    />
  )
}

class Desktop extends Component {

  state = {
    currentImage: 0
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

  scrollToSection = (i, key) => ScrollTo(this[key], {duration: 1500, offset: -32, align: 'top'}, this.scrollComplete)

  scrollComplete = () => console.log('scroll complete!!')

  handleSectionEnter = (key) => {
    // console.log('handleSectionEnter: ', key)
    this.setState({currentSection: key})
  }

  render() {
    const { portfolios, videos, instagram, biography, sections = [], title } = this.props
    const images = []
    return (
      <div>
      <Grid>
        <Row>
          <Col xs={ 2 }>
            Menu
          </Col>
          <Col xs={ 10 }>
            <h1>
              {title}
            </h1>
          </Col>
        </Row>
      </Grid>
        <div>
          <div css={{
            width: '12rem',
            marginLeft: '8rem'
          }}>
            <Menu
              sections={sections}
              scrollToSection={this.scrollToSection}
              currentSection={this.state.currentSection}
            />
          </div>
          <div css={{
            float: 'left',
            width: 'calc(100% - 20rem)',
            marginLeft: '20rem'
          }}>
            {
              portfolios && portfolios.map((portfolio, index) => {
                const refKey = sections[index].key
                return (
                  <Waypoint
                    onEnter={() => this.handleSectionEnter(refKey)}
                    key={index}
                    ref={(section) => { this[refKey] = section; }}
                  >
                    <div
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

                        sizes.sizes = '500px'
                        images.push({src, srcSet: srcSet.split(',')})
                        const imageIndex = images.length - 1
                        return (
                          <div
                            key={index}
                            css={{
                              position: 'relative',
                              display: 'inline-block',
                              minWidth: 'auto',
                              margin: '0 16px 32px'
                            }}
                            onClick={(evt) => this.openLightbox(evt, {index: imageIndex})}
                          >
                            <Img
                              outerCss={{ width: 256 * aspectRatio + 'px' }}
                              innerCss={{
                                width: 'auto',
                                height: '256px'
                              }}
                              sizes={sizes}
                            />
                          </div>
                          )
                        }
                      })
                    }
                    </div>
                  </Waypoint>
                )
              })
            }
            {
              // VIDEOS
              videos && (
                <Waypoint
                  ref={(section) => { this.Videos = section; }}
                  onEnter={() => this.handleSectionEnter(`Videos`)}
                >
                  <div
                    css={{
                      marginBottom: '20rem',
                      textAlign: 'center'
                    }}
                  >
                  {
                    videos.map((video, index) =>
                      <Video
                        key={index}
                        url={video.url}
                        title={video.title}
                      />
                    )
                  }
                  </div>
                </Waypoint>
              )
            }
            { // INSTAGRAM
              instagram && (
                <Waypoint
                  ref={(section) => { this.Instagram = section; }}
                  onEnter={() => this.handleSectionEnter(`Instagram`)}
                >
                  <div
                    css={{
                      marginBottom: '20rem',
                      textAlign: 'center'
                    }}
                  >
                  {
                    //     instagram.map(photo => views.push({ instagram: { src: photo.node.media }}))

                    instagram.map((photo, index) =>
                      <div
                        key={index}
                        css={{
                          position: 'relative',
                          display: 'inline-block',
                          minWidth: 'auto',
                          margin: '0 15px 30px'
                        }}
                      >
                        <img
                          style={{
                            width: 'auto',
                            height: '256px'
                          }}
                          src={photo.node.media}
                          //sizes={{ src: photo.node.media }}
                        />
                      </div>
                    )
                  }
                  </div>
                </Waypoint>
              )
            }
            { // BIOGRAPHY
              biography && (
                <Waypoint
                  ref={(section) => { this.Biography = section; }}
                  onEnter={() => this.handleSectionEnter(`Biography`)}
                >
                  <div>
                    <Grid>
                      <Row>
                        <Col xs={ 4 }>
                        {
                          biography.image && (
                            <Img
                              style={{
                                width: biography.image.childImageSharp.resolutions.width + 'px',
                                height: biography.image.childImageSharp.resolutions.height + 'px'
                              }}
                              resolutions={biography.image.childImageSharp.resolutions}
                            />
                          )
                        }
                        </Col>
                        <Col xs={ 6 }>
                          <div dangerouslySetInnerHTML={{ __html: biography.text }} />
                        </Col>
                      </Row>
                    </Grid>
                  </div>
              </Waypoint>
              )
            }
            <Lightbox
              images={images}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Model
