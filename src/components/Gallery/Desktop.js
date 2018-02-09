import React, { Component } from 'react'
import Lightbox from 'react-images'
import Waypoint from 'react-waypoint'

import ScrollTo from '../ScrollTo'
import { Grid, Row, Col } from '../Grid'
import Img from '../Image'
import Video from '../Video'
import Menu from '../Menu'
import Header from '../Header'

const Model = ({
  portfolios = [],
  videos = [],
  instagram = [],
  biography,
  image,
  title,
  type,
  instagram_handle,
  enquire
}) => {

  const sections = portfolios ? portfolios.map(portfolio => {
    return {
      title: portfolio.title,
      key: portfolio.title.replace(/ /g, ''),
      count: portfolio.gallery.length
    }
  }) : []

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
        name: title,
        type: type,
        text: biography,
        image: image,
        enquire: enquire,
        instagram: instagram_handle
      }}
    />
  )
}

class Desktop extends Component {

  state = {
    currentImage: 0,
    isVisible: true
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
      isVisible: false,
    });
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
      isVisible: true
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

  scrollToSection = (i, key) => {
    this.setState({isVisible: false})
    setTimeout(()=> {
      ScrollTo(this[key], {duration: 0, offset: -32, align: 'top'})
      this.setState({isVisible: true})
    }, 800)

  }

  scrollComplete = () => console.log('scroll complete!!')

  handleSectionEnter = (key) => {
    // console.log('handleSectionEnter: ', key)
    this.setState({currentSection: key})
  }

  render() {
    const { portfolios, videos, instagram, biography, sections = [] } = this.props
    const images = []
    return (
      <div>
        <div>
          <div css={{
            width: '10rem',
            marginLeft: '6rem'
          }}>
            <Menu
              type={biography.type}
              sections={sections}
              scrollToSection={this.scrollToSection}
              currentSection={this.state.currentSection}
            />
          </div>
          <div css={{
            marginTop: '3rem',
            float: 'left',
            width: 'calc(100% - 18rem)',
            marginLeft: '18rem',
            transition: 'opacity 800ms ease-out, transform 600ms ease-out, 600ms filter ease-out',
            transform: this.state.isVisible ? 'translate3d(0,0,0)' : 'translate3d(0,-40px,0)',
            opacity: this.state.isVisible ? 1 : 0
          }}>
            <Header
              name={biography.name}
              instagram={biography.instagram}
              enquire={biography.enquire}
            />

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
                        marginTop: '10rem',
                        marginBottom: '10rem',
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
                    <Grid fluid>
                      <Row>
                        <Col xs={ 3 }>
                        {
                          biography.image && (
                            <Img
                              style={{
                                width: 256 * ( biography.image.childImageSharp.resolutions.width / biography.image.childImageSharp.resolutions.height ) + 'px',
                                height: '256px'
                              }}
                              resolutions={biography.image.childImageSharp.resolutions}
                            />
                          )
                        }
                        </Col>
                        <Col xs={ 7 }>
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
