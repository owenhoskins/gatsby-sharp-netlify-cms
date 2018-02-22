import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from '../Lightbox'
import Waypoint from 'react-waypoint'
import EventListener, { withOptions } from 'react-event-listener'
import Gallery from './'

import ScrollTo from '../ScrollTo'
import { Grid, Row, Col } from '../Grid'
import Img from '../Image'
import Video from '../Video'
import Menu from '../Menu'
import { HeaderDesktop } from '../Header'
import Cover from '../Cover'

import { HeaderLG, HeaderSM } from '../Styled'

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
}

const Model = ({
  cover,
  portfolios = [],
  videos = [],
  instagram = [],
  biography,
  portrait,
  title,
  type,
  instagram_handle,
  followers,
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
    sections.push({title: 'Video', key: 'Videos', count: videos.length})
  }

  if (instagram && instagram.length > 0) {
    sections.push({title: 'Instagram', key: 'Instagram', count: instagram.length})
  }

  if (biography && biography.length > 0) {
    sections.push({title: 'Biography', key: 'Biography', count: 1 })
  }

  return (
    <Desktop
      cover={cover}
      sections={sections}
      portfolios={portfolios}
      videos={videos}
      instagram={instagram}
      biography={{
        name: title,
        type: type,
        text: biography,
        portrait: portrait,
        enquire: enquire,
        instagram: instagram_handle,
        followers: followers
      }}
    />
  )
}

class Desktop extends Component {

  state = {
    currentSection: 0,
    currentImage: 0,
    isVisible: false,
    isCover: true,
    lightboxIsOpen: false
  }

/*
  static contextTypes = {
    scrolled: PropTypes.bool
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextContext.scrolled &&
      this.context.scrolled !== nextContext.scrolled
    ) {
      this.setState({isCover: false, isVisible: true})
    }
  }

*/
  openLightbox = (event, obj) => {
    // console.log('openLightbox: ', obj)
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
      isVisible: false,
    });
  }

  closeLightbox = () => {
    this.setState({
      //currentImage: 0,
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
    const index = this.props.sections.findIndex(section => section.key === key)
    this.setState({isVisible: false})
    setTimeout(()=> {
      ScrollTo(this[key], {duration: 0, offset: -80, align: 'top'})
      setTimeout(()=> {
        this.setState({isVisible: true, currentSection: index})
      }, 200)
    }, 800)
  }

  onPositionChange = ({currentPosition}, key) => {
    if (!this.state.isCover) {
      console.log('onPositionChange: ', currentPosition, key)
      const index = this.props.sections.findIndex(section => section.key === key)
      if (currentPosition === 'inside') {
        this.setState({currentSection: index})
      } else if (currentPosition === 'above') {
        // if it is "above", the active section it is to the right
        this.setState({currentSection: index + 1})
      } else if (currentPosition === 'below') {
        // if it is "below", the active section it is to the left
        this.setState({currentSection: index - 1})
      }
    }
  }

  gotoPortfolios = () => {
    this.setState({isVisible: !this.state.isVisible, isCover: !this.state.isCover})
  }

  handleScroll = (e) => {

    if (this.state.isCover) {
      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 5) {
        this.setState({isCover: false, isVisible: true})
      }
    }

    if (this.state.lightboxIsOpen) {
      this.setState({ lightboxIsOpen: false, isVisible: true })
    }
  }

  render() {
    const { cover, portfolios, videos, instagram, biography, sections = [] } = this.props
    const images = []
    return (
      <div>
        <EventListener
          target={ 'window' }
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}
        />
        <div>
          <div css={{
            width: '10rem',
            marginLeft: '6rem'
          }}>
            <Menu
              isCover={this.state.isCover || this.state.lightboxIsOpen}
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
            pointerEvents: this.state.isCover || this.state.lightboxIsOpen ? 'none' : 'auto'
          }}>
            <HeaderDesktop
              isCover={this.state.isCover || this.state.lightboxIsOpen}
              name={biography.name}
              instagram={biography.instagram}
              enquire={biography.enquire}
            />
            <div
              css={{
                transition: 'opacity 1000ms ease-out, transform 800ms ease-out, 800ms filter ease-out',
                transform: this.state.isVisible ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
                opacity: this.state.isVisible ? 1 : 0
              }}
            >
              {
                portfolios && portfolios.map((portfolio, index) => {
                  const refKey = sections[index].key
                  const photos = []
                  return (
                    <Waypoint
                      //onEnter={() => this.handleSectionEnter(refKey)}
                      onPositionChange={(props) => this.onPositionChange(props, refKey) }
                      key={index}
                      ref={(section) => { this[refKey] = section; }}
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
                        <div css={{margin: '0rem 0 0rem', opacity: 0}}>
                          <HeaderLG>
                            {sections[index].title}
                          </HeaderLG>
                        </div>
                      {
                        portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                          if (image && image.childImageSharp) {
                            const { childImageSharp: { sizes }} = image
                            const { aspectRatio, src, srcSet } = sizes
                            const srcSetArray = srcSet.split(',')
                            sizes.sizes = '500px'
                            images.push({
                              src,
                              srcSet: srcSetArray,
                              biggest: srcSetArray[srcSetArray.length - 1],
                              sizes,
                              orientation: aspectRatio > 1 ? 'landscape' : 'portrait'
                            })
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

                        /*if (image && image.childImageSharp) {
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
                            )*/
                      }
                      <Gallery
                        margin={16}
                        columns={4}
                        ImageComponent={renderImage}
                        photos={photos}
                        onClick={this.openLightbox}
                      />
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
                    topOffset={-50}
                    botttomOffset={-50}
                    onPositionChange={(props) => this.onPositionChange(props, `Videos`) }
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
                    <div
                      css={{
                        margin: '0rem 0 0rem',
                        opacity: 0
                      }}
                    >
                      <HeaderLG>
                        {`Video`}
                      </HeaderLG>
                    </div>
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
              { // INSTAGRAM
                instagram && (
                  <Waypoint
                    ref={(section) => { this.Instagram = section; }}
                    topOffset={-50}
                    botttomOffset={-50}
                    //onEnter={() => this.handleSectionEnter(`Instagram`)}
                    onPositionChange={(props) => this.onPositionChange(props, `Instagram`) }
                  >
                    <div
                      css={{
                        paddingTop: '5rem',
                        paddingBottom: '10rem',
                        textAlign: 'center'
                      }}
                    >
                    <div css={{margin: '5rem 0 5rem'}}>
                      <HeaderLG>
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
              { // BIOGRAPHY
                biography && (
                  <Waypoint
                    ref={(section) => { this.Biography = section; }}
                    topOffset={-50}
                    botttomOffset={-50}
                    //onEnter={() => this.handleSectionEnter(`Biography`)}
                    onPositionChange={(props) => this.onPositionChange(props, `Biography`) }
                  >
                    <div>
                      <Grid fluid>
                        <Row>
                          {/*
                          <Col xs={ 3 }>
                            biography.portrait && (
                              <Img
                                style={{
                                  width: 256 * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                                  height: '256px'
                                }}
                                resolutions={biography.portrait.childImageSharp.resolutions}
                              />
                            )
                          </Col>
                          */}
                          <Col xs={ 7 }>
                            <div dangerouslySetInnerHTML={{ __html: biography.text }} />
                          </Col>
                        </Row>
                      </Grid>
                    </div>
                </Waypoint>
                )
              }
            </div>
            <Lightbox
              images={images}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
            <Cover
              name={biography.name}
              cover={cover}
              //currentImage={this.state.currentImage}
              //images={images}
              isCover={this.state.isCover}
              onClick={this.gotoPortfolios}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Model
