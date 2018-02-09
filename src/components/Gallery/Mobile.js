import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Block } from 'glamor/jsxstyle'

import { Tabs, Tab } from '../UI'
import Img from '../Image'
import Video from '../Video'

const Model = ({portfolios, videos, instagram, biography, portrait}) => {

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
      const { childImageSharp: { sizes }} = portrait
      views.push({ biography: { text: biography, image: sizes } })
    }

  }

  console.log('sections: ', sections)
  console.log('viewIndexes: ', viewIndexes)
  console.log('views: ', views)

  return (
    <MobileGallery
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
        <h1>
          {title}
        </h1>
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
              />
            })
          }
        </Tabs>
        <SwipeableViews
          enableMouseEvents={true}
          index={viewIndex}
          onChangeIndex={this.handleChangeIndex}
          style={{
            padding: '0 2rem',
          }}
          slideStyle={{
            padding: '0 0.3rem'
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
                        width: 'auto',
                        height: '70vh'
                      }}
                      sizes={image}
                    />
                  )
                }
                if (video) {
                  return <Video
                    url={video.url}
                    title={video.title}
                  />
                }
                if (instagram) {
                  return <Img
                    key={index}
                    style={{
                      width: 'auto',
                      height: '70vh'
                    }}
                    sizes={instagram}
                  />
                }
                if (biography) {
                  return (
                    <div>
                        <Img
                          key={index}
                          style={{
                            width: 'auto',
                            height: '15rem'
                          }}
                          sizes={biography.image}
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
