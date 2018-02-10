import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Block } from 'glamor/jsxstyle'

import { Tabs, Tab } from '../UI'
import Img from '../Image'
import Video from '../Video'
import { Headline } from '../Styled'

const Model = ({
  portfolios,
  videos,
  instagram,
  biography,
  portrait,
  title
}) => {

  const views = []
  const viewIndexes = []

  const sections = portfolios.map((portfolio, index) => {

    if (index === 0) { // first tab
      viewIndexes.push(0)
    } else if (index === 1) { // second tab
      viewIndexes.push(portfolios[index - 1].gallery.length)
    } else { // following tabs
      let sum = 0
      for (var i = 0; i < index; i++) {
        sum = sum + portfolios[i].gallery.length
      }
      viewIndexes.push(sum)
    }

    portfolio.gallery && portfolio.gallery.forEach(({image}) => {
      if (image && image.childImageSharp) {
        const { childImageSharp: { sizes }} = image
        views.push({image: sizes})
      } else {
        console.log("!!does not have childImageSharp: ", image)
      }
    })

    return {
      title: portfolio.title,
      count: portfolio.gallery.length
    }
  })

  if (videos && videos.length > 0) {
    const starting = sections[sections.length - 1].count + viewIndexes[viewIndexes.length - 1]
    viewIndexes.push(starting)
    sections.push({title: 'Videos', count: videos.length})
    videos.map((video, index) => { views.push({video})})
  }

  if (instagram && instagram.length > 0) {
    const starting = sections[sections.length - 1].count + viewIndexes[viewIndexes.length - 1]
    viewIndexes.push(starting)
    sections.push({title: 'Instagram', count: instagram.length})
    instagram.map(photo => views.push({ instagram: { src: photo.node.media }}))
  }

  if (biography && biography.length > 0) {
    const starting = sections[sections.length - 1].count + viewIndexes[viewIndexes.length - 1]
    viewIndexes.push(starting)
    sections.push({title: 'Biography', count: 1})

    if (portrait && portrait.childImageSharp) {
      //const { childImageSharp: { resolutions }} = portrait
      views.push({ biography: { text: biography, portrait: portrait } })
    }

  }

  //console.log('sections: ', sections)
  //console.log('viewIndexes: ', viewIndexes)
  //console.log('views: ', views)

  return (
    <MobileGallery
      title={title}
      sections={sections}
      views={views}
      viewIndexes={viewIndexes}
    />
  )


}

class MobileGallery extends Component {
  state = {
    viewIndex: 0,
    tabIndex: 0
  }

  handleChange = (value) => {
    this.setState({
      viewIndex: value,
    })
  }

  handleChangeTabIndex = tabIndex => {
    this.setState({
      tabIndex: tabIndex
    })
  }

  handleChangeIndex = viewIndex => {
    this.setState({ viewIndex })

    const { viewIndexes = [] } = this.props
    viewIndexes.forEach((value, index) => {
      if (
        viewIndex > viewIndexes[viewIndexes.length - 1] ||
        (
          viewIndex >= value &&
          viewIndex <= viewIndexes[index + 1]
        )
      ) {
        this.setState({ tabIndex: index })
      }
    })

  }

  render() {
    const { viewIndex, tabIndex } = this.state;
    const { title, sections = [], views = [], viewIndexes = [] } = this.props

    return (
      <div>
        <Headline style={{margin: '4rem 2.3rem'}}>
          {title}
        </Headline>
        <Tabs
          viewIndexes={viewIndexes}
          tabIndex={tabIndex}
          onChange={this.handleChange}
          onChangeTabIndex={this.handleChangeTabIndex}
        >
          {
            sections.map((portfolio, index) => {
              return <Tab
                key={index}
                label={portfolio.title}
                active={tabIndex === index}
              />
            })
          }
        </Tabs>
        <SwipeableViews
          index={viewIndex}
          onChangeIndex={this.handleChangeIndex}
          style={{
            padding: '0 2rem',
          }}
          slideStyle={{
            padding: '0 0.3rem',
          }}
        >
          {
            views.map((view, index) => {
              if (view) {
                const { image, video, instagram, biography } = view
                if (image) {

                  return (
                    <Img
                      key={index}
                      style={{
                        //width: 'auto',
                        //height: '70vh'
                        // 1.4925595238095237
                      }}
                      sizes={image}
                    />
                  )
                }
                if (video) {
                  return <Video
                    key={index}
                    url={video.url}
                    title={video.title}
                  />
                }
                if (instagram) {
                  return <img
                    key={index}
                    style={{
                      width: 'auto',
                      height: '256px'
                    }}
                    src={instagram.src}
                  />
                }
                if (biography) {
                  return (
                    <div>
                        <Img
                          style={{
                            width: 256 * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                            height: '256px'
                          }}
                          resolutions={biography.portrait.childImageSharp.resolutions}
                        />
                      <div dangerouslySetInnerHTML={{ __html: biography.text }} />
                    </div>
                  )
                }
              }
            })
          }
        </SwipeableViews>
      </div>
    )
  }
}

export default Model
