import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Waypoint from 'react-waypoint'

import Cover from '../Cover'
import { ScrollLeft } from '../Scroll'
import { HeaderMobile } from '../Header'
import { Tabs, Tab } from '../UI'

import {
  Portfolios,
  Videos,
  Instagram,
  Biography
} from '../Sections/Mobile'

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
        followers: followers
      }}
    />
  )


}

class MobileGallery extends Component {
  state = {
    tabIndex: 0,
    isVisible: false,
    isCover: true
  }

  scrollToSection = (tabIndex, sectionKey) => {
    console.log('scrollToSection: ', tabIndex, sectionKey)
    this.setState({isVisible: false})
    setTimeout(()=> {
      ScrollLeft(this[sectionKey], {duration: 0, offset: -16, align: 'top'})
      setTimeout(() => this.setState({tabIndex: tabIndex, isVisible: true}), 200)
    }, 1000)
  }

  handleChangeTabIndex = (tabIndex) => {
    console.log('tabIndex: ', tabIndex)
    this.setState({
      tabIndex: tabIndex
    })
  }

  onPositionChange = ({currentPosition}, key) => {
    if (!this.state.isCover) {
      console.log('onPositionChange: ', currentPosition, key)
      const index = this.props.sections.findIndex(section => section.key === key)
      // var obj = objArray.find(function (obj) { return obj.id === 3; });
      if (currentPosition === 'inside') {
        this.setState({tabIndex: index})
      } else if (currentPosition === 'above') {
        // if it is "above", the active section it is to the right
        this.setState({tabIndex: index + 1})
      } else if (currentPosition === 'below') {
        // if it is "below", the active section it is to the left
        this.setState({tabIndex: index - 1})
      }
    }
  }

  gotoPortfolios = () => {
    this.setState({isVisible: !this.state.isVisible, isCover: !this.state.isCover})
  }

  returnRef = (ref, refKey) => this[refKey] = ref

  render() {
    const { tabIndex } = this.state;
    const { cover, portfolios, videos, instagram, biography, sections = [] } = this.props

    return (
      <div>
        <Cover
          name={biography.name}
          cover={cover}
          isCover={this.state.isCover}
          onClick={this.gotoPortfolios}
        />

        <HeaderMobile
          isCover={this.state.isCover}
          biography={biography}
        />

        <div
          css={{
            position: 'fixed',
            top: '5rem',
            left: 0,
            transition: 'opacity 1000ms ease-out',
            opacity: !this.state.isCover ? 1 : 0,
            transform: !this.state.isCover ? 'translate3d(0,0,0)' : 'translate3d(20px,0,0)',
            transition: 'opacity 1000ms ease-out, transform 800ms ease-out, 800ms filter ease-out',
          }}
        >
        {
          sections && (
            <Tabs
              scrollToSection={this.scrollToSection}
              tabIndex={tabIndex}
              onChangeTabIndex={this.handleChangeTabIndex}
              sections={sections}
              style={{
                transition: 'opacity 1000ms ease-out',
                opacity: !this.state.isCover ? 1 : 0
              }}
            />
          )
        }
        </div>



        <div
          className={'overflow-touch'}
          css={{
            marginTop: `11rem`,
            height: `26rem`,
            //display: `inline-flex`,
            display: 'flex',
            overflowX: 'auto',
            transition: 'opacity 1000ms ease-out, transform 800ms ease-out, 800ms filter ease-out',
            transform: this.state.isVisible ? 'translate3d(0,0,0)' : 'translate3d(20px,0,0)',
            opacity: this.state.isVisible ? 1 : 0,
          }}
        >
          {
            portfolios && (
              <Portfolios
                sections={sections}
                portfolios={portfolios}
                returnRef={this.returnRef}
                onPositionChange={this.onPositionChange}
              />
            )
          }
          {
            videos && <Videos
              videos={videos}
              returnRef={this.returnRef}
              onPositionChange={this.onPositionChange}
            />
          }
          {
            instagram && <Instagram
              instagram={instagram}
              returnRef={this.returnRef}
              onPositionChange={this.onPositionChange}
            />
          }
          {
            biography && <Biography
              biography={biography}
              returnRef={this.returnRef}
              onPositionChange={this.onPositionChange}
            />
          }
        </div>
      </div>
    )
  }
}

export default Model
