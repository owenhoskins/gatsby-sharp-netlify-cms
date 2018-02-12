import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-images'
import Waypoint from 'react-waypoint'
import EventListener, { withOptions } from 'react-event-listener'
import Gallery from './'

import ScrollTo from '../ScrollTo'
import { Grid, Row, Col } from '../Grid'
import Img from '../Image'
import Video from '../Video'
import Menu from '../Menu'
import Header from '../Header'
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
  follows,
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
        follows: follows
      }}
    />
  )
}

class Desktop extends Component {

  state = {
    currentImage: 0,
    isVisible: false,
    isCover: true
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
      ScrollTo(this[key], {duration: 0, offset: 0, align: 'top'})
      this.setState({isVisible: true})
    }, 800)

  }

  scrollComplete = () => console.log('scroll complete!!')

/*
  handleSectionEnter = (key) => {
    // console.log('handleSectionEnter: ', key)
    this.setState({currentSection: key})
  }
  */

  onPositionChange = ({currentPosition}, key) => {
    //console.log('onPositionChange: ', currentPosition, key)
    if (currentPosition === 'inside') {
      this.setState({currentSection: key})
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
        <Cover
          name={biography.name}
          cover={cover}
          isCover={this.state.isCover}
          onClick={this.gotoPortfolios}
        />
        <div>
          <div css={{
            width: '10rem',
            marginLeft: '6rem'
          }}>
            <Menu
              isCover={this.state.isCover}
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
            pointerEvents: this.state.isCover ? 'none' : 'auto'
          }}>
            <Header
              isCover={this.state.isCover}
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
                            {sections[index].title}
                          </HeaderLG>
                        </div>
                      {
                        portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                          const { childImageSharp: { sizes }} = image
                          const { aspectRatio, src, srcSet } = sizes
                          sizes.sizes = '500px'
                          images.push({src, srcSet: srcSet.split(',')})
                          photos.push({
                            width: aspectRatio,
                            height: 1,
                            src,
                            srcSet: srcSet.split(","),
                            sizes: [sizes.sizes],
                            originalSizes: sizes,
                            imageIndex: images.length - 1
                          })
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
                    //onEnter={() => this.handleSectionEnter(`Videos`)}
                    onPositionChange={this.onPositionChange}
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
                        {`Videos`}
                      </HeaderLG>
                    </div>
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
                        {`@${biography.instagram}`}
                      </HeaderLG>
                      <HeaderSM>
                        {`${biography.follows} following`}
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
                    //onEnter={() => this.handleSectionEnter(`Biography`)}
                    onPositionChange={(props) => this.onPositionChange(props, `Biography`) }
                  >
                    <div>
                      <Grid fluid>
                        <Row>
                          <Col xs={ 3 }>
                          {
                            biography.portrait && (
                              <Img
                                style={{
                                  width: 256 * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                                  height: '256px'
                                }}
                                resolutions={biography.portrait.childImageSharp.resolutions}
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
      </div>
    )
  }

}

export default Model
