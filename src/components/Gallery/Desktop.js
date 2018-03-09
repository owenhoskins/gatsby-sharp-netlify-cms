import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from '../Lightbox'
import EventListener, { withOptions } from 'react-event-listener'

import { ScrollTop } from '../Scroll'
import Menu from '../Menu/Services'
import { HeaderDesktop } from '../Header'
import Cover from '../Cover'

import {
  Portfolios,
  Videos,
  Instagram,
  Biography
} from '../Sections/Desktop'


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
    //lightboxIsOpen: false,
    isHovered: true
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context.isCover !== nextContext.isCover) {
      this.setState({isVisible: !nextContext.isCover})
    }
  }

  openLightbox = (event, obj) => {
    // console.log('openLightbox: ', obj)
    this.setState({
      currentImage: obj.index,
      //lightboxIsOpen: true,
      isVisible: false,
    });
    this.context.toggleLightbox(true)
  }

  closeLightbox = () => {
    this.setState({
      //currentImage: 0,
      //lightboxIsOpen: false,
      isVisible: true
    });
    this.context.toggleLightbox(false)
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
      ScrollTop(this[key], {duration: 0, offset: -80, align: 'top'})
      setTimeout(()=> {
        this.setState({isVisible: true, currentSection: index})
      }, 200)
    }, 800)
  }

  onPositionChange = ({currentPosition}, key) => {
    if (!this.context.isCover) {
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
    this.context.toggleIsCover(!this.context.isCover)
    //this.setState({isVisible: !this.state.isVisible})
  }

  handleScroll = (e) => {

    if (this.context.isCover) {
      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 5) {
        //this.setState({isVisible: true})
        this.context.toggleIsCover(false)
      }
    }

    if (this.context.lightboxIsOpen) {
      this.context.toggleLightbox(false)
      this.setState({
        //lightboxIsOpen: false,
        isVisible: true
      })
    }
  }

  onMouseEnter = () => {
    this.setState({isHovered: true})
  }

  onMouseLeave = () => {
    this.setState({isHovered: false})
  }


  returnRef = (ref, refKey) => this[refKey] = ref

  get images() {
    const images = []
    const { portfolios, sections } = this.props
    portfolios && portfolios.map((portfolio, index) => {
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
        }
      })
    })
    return images
  }

  render() {
    const { cover, portfolios, videos, instagram, biography, sections = [], transition } = this.props
    return (
      <div>
        <EventListener
          target={ 'window' }
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}
        />
        <div
          //style={transition && transition.style}
        >
          <div css={{
            width: '10rem',
            marginLeft: '6rem'
          }}>
            <Menu
              isHovered={this.state.isHovered}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              isCover={this.context.isCover || this.context.lightboxIsOpen}
              type={biography.type}
              sections={sections && sections.map(section => section.title)}
              scrollToSection={this.scrollToSection}
              currentSection={this.state.currentSection}
            />
          </div>
          <div css={{
            marginTop: '2.5rem',
            float: 'left',
            width: 'calc(100% - 18rem)',
            marginLeft: '18rem',
            pointerEvents: this.context.isCover || this.context.lightboxIsOpen ? 'none' : 'auto'
          }}>
            <div
              css={{
                transition: 'opacity 1000ms ease-out, transform 800ms ease-out, 800ms filter ease-out',
                transform: this.state.isVisible ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
                opacity: this.state.isVisible ? 1 : 0
              }}
            >
              {
                portfolios && (
                  <Portfolios
                    openLightbox={this.openLightbox}
                    sections={sections}
                    portfolios={portfolios}
                    returnRef={this.returnRef}
                    onPositionChange={this.onPositionChange}
                  />
                )
              }
              {
                videos && (
                  <Videos
                    videos={videos}
                    returnRef={this.returnRef}
                    onPositionChange={this.onPositionChange}
                  />
                )
              }

              { // INSTAGRAM
                instagram && (
                  <Instagram
                    biography={biography}
                    instagram={instagram}
                    returnRef={this.returnRef}
                    onPositionChange={this.onPositionChange}
                  />
                )
              }
              { // BIOGRAPHY
                biography && (
                  <Biography
                    biography={biography}
                    returnRef={this.returnRef}
                    onPositionChange={this.onPositionChange}
                  />
                )
              }
            </div>
            { !this.context.isCover && (
              <Lightbox
                images={this.images}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.context.lightboxIsOpen}
              />
            )}
            <Cover
              name={biography.name}
              cover={cover}
              //currentImage={this.state.currentImage}
              //images={images}
              isCover={this.context.isCover}
              onClick={this.gotoPortfolios}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Model

Desktop.contextTypes = {
  isCover: PropTypes.bool,
  toggleIsCover: PropTypes.func,
  lightboxIsOpen: PropTypes.bool,
  toggleLightbox: PropTypes.func
}
