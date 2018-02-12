import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Waypoint from 'react-waypoint'

import ScrollHorizontal from '../ScrollHorizontal'

import { Tabs, Tab } from '../UI'
import Img from '../Image'
import Video from '../Video'
import { Headline } from '../Styled'

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
    <MobileGallery
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

class MobileGallery extends Component {
  state = {
    tabIndex: 0,
    isVisible: true
  }

  scrollToSection = (sectionKey) => {
    this.setState({isVisible: false})
    setTimeout(()=> {
      ScrollHorizontal(this[sectionKey], {duration: 0, offset: -20, align: 'top'})
      this.setState({isVisible: true})
    }, 1000)
  }

  handleChangeTabIndex = tabIndex => {
    //page.scrollLeft = tabIndex * 10000
    console.log('tabIndex: ', tabIndex)
    this.setState({
      tabIndex: tabIndex
    })
  }

  onPositionChange = ({currentPosition}, key) => {
    console.log('onPositionChange: ', currentPosition, key)
    const index = this.props.sections.findIndex(section => section.key === key)
    // var obj = objArray.find(function (obj) { return obj.id === 3; });
    if (currentPosition === 'inside') {
      this.setState({tabIndex: index})
    }
  }

  handleSectionEnter = (obj, key) => {
    const index = this.props.sections.findIndex(section => section.key === key)
    console.log('handleSectionEnter: ', obj, key)
    this.setState({tabIndex: index})
  }

  render() {
    const { tabIndex } = this.state;
    const { cover, portfolios, videos, instagram, biography, sections = [] } = this.props

    return (
      <div>
        <Headline
          style={{
            position: 'fixed',
            top: '2rem',
            left: '2.3rem'
          }}
        >
          {biography.name}
        </Headline>
        <div
          css={{
            position: 'fixed',
            top: '4rem',
            left: 0,
          }}
        >
          <Tabs
            scrollToSection={this.scrollToSection}
            tabIndex={tabIndex}
            onChangeTabIndex={this.handleChangeTabIndex}
            sections={sections}
          />
        </div>
        <div
          css={{
            marginTop: `10rem`,
            height: `26rem`,
            display: `inline-flex`,
            transition: 'opacity 1000ms ease-out, transform 800ms ease-out, 800ms filter ease-out',
            transform: this.state.isVisible ? 'translate3d(0,0,0)' : 'translate3d(20px,0,0)',
            opacity: this.state.isVisible ? 1 : 0
          }}
        >
          {
            portfolios && portfolios.map((portfolio, index) => {
            const refKey = sections[index].key
            //const refKey = portfolio.title.replace(/ /g, '')
              return (
                <Waypoint
                  horizontal={true}
                  onEnter={(props) => this.handleSectionEnter(props, refKey)}
                  onPositionChange={(props) => this.onPositionChange(props, refKey) }
                  key={index}
                  ref={(section) => { this[refKey] = section; }}
                >
                  <div css={{display: 'inherit'}}>
                  {
                    portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                      const { childImageSharp: { sizes }} = image
                      const { aspectRatio, src, srcSet } = sizes
                      sizes.sizes = '500px'
                      return (
                        <Img
                          key={index}
                          outerCss={{
                            width: 400 * aspectRatio + 'px',
                            display: 'block',
                            float: 'left',
                            margin: '16px'
                          }}
                          sizes={sizes}
                        />
                      )
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
                horizontal={true}
                ref={(section) => { this.Videos = section; }}
                onEnter={(props) => this.handleSectionEnter(props, `Videos`)}
                onPositionChange={(props) => this.onPositionChange(props, `Videos`) }
              >
                <div css={{display: 'inherit'}}>
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
                horizontal={true}
                ref={(section) => { this.Instagram = section; }}
                onEnter={(props) => this.handleSectionEnter(props, `Instagram`)}
                onPositionChange={(props) => this.onPositionChange(props, `Instagram`) }
              >
                <div css={{display: 'inherit'}}>
                {
                  instagram.map((photo, index) =>
                    <div
                      key={index}
                      css={{
                        position: 'relative',
                        display: 'inline-block',
                        minWidth: 'auto',
                        margin: '0 5px 5px',
                        width: window && window.innerWidth,
                        textAlign: 'center',
                        fontSize: 0,
                      }}
                    >
                      <Img
                        style={{
                          width: window && window.innerWidth,
                          height: window && window.innerWidth,
                          marginBottom: 0
                        }}
                        customAspect={{ height: window && window.innerWidth }}
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
                horizontal={true}
                ref={(section) => { this.Biography = section; }}
                onEnter={(props) => this.handleSectionEnter(props, `Biography`)}
                onPositionChange={(props) => this.onPositionChange(props, `Biography`) }
              >
                <div css={{display: 'inherit'}}>
                {
                  biography.portrait && (
                    <Img
                      style={{
                        width: window && window.innerWidth * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                        height: window && window.innerWidth
                      }}
                      resolutions={biography.portrait.childImageSharp.resolutions}
                    />
                  )
                }
                <div
                  css={{
                    //columnWidth: window && window.innerWidth,
                    //columnCount: 3
                  }}
                  dangerouslySetInnerHTML={{ __html: biography.text }}
                />
              </div>
            </Waypoint>
            )
          }
        </div>
      </div>
    )
  }
}

export default Model
