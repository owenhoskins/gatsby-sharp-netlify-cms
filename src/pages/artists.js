import React, { Component } from 'react'

import { withWindowSizeListener } from '../utils/windowResizeListener'

import { ScrollTop } from '../components/Scroll'

import Menu from '../components/Menu/Services'
import ColumnWidth from '../components/Columns/ColumnWidth'
import NameList from '../components/Columns/NameList'

import ScrollPercentage from 'react-scroll-percentage'


class ArtistsPage extends Component {


  constructor(props) {
    super(props)

    const columnPixelWidth = 400
    const vwUnitPixelWidth = props.windowWidth / 100 // 25.6
    const vwUnits = columnPixelWidth / vwUnitPixelWidth

    const leftOffset = 300
    const limit = 1 - (leftOffset / props.windowWidth)

    this.state = {
      inViewIndex: 0,
      inView: '',
      viewportUnit: props.windowHeight >= props.windowWidth ? 'vh' : 'vw',
      vwUnitPixelWidth,
      vwUnits,
      limit
    }

  }

  componentDidMount() {
    if (this.props.location.hash) {
      this.scrollToSection(0, this.props.location.hash.replace('#', ''))
    } else {
      this.scrollToSection(0, 'hair')
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {
      windowSize: { windowHeight, windowWidth }
    } = nextProps

    if (
        this.props.windowSize.windowHeight !== windowHeight ||
        this.props.windowSize.windowWidth !== windowWidth
      ) {

      // const columnWidth = `23` // rem === 368px
      // 2rem gutter
      const columnPixelWidth = 400
      const vwUnitPixelWidth = windowWidth / 100 // 25.6
      const vwUnits = columnPixelWidth / vwUnitPixelWidth

      const leftOffset = 300
      const limit = 1 - (leftOffset / windowWidth)

      this.setState({
        viewportUnit: windowHeight >= windowWidth ? 'vh' : 'vw',
        vwUnitPixelWidth,
        vwUnits,
        limit
      })


    }

  }

  scrollToSection = (i, key) => {
    ScrollTop(this[key], {duration: 500, offset: 0, align: 'top'})
  }

  handleChange = ({percentage, inView, index, refKey}) => {
    //console.log(`handleChange ${index} / ${refKey} / ${percentage}`)
    if (inView && (percentage >= this.state.limit && percentage <= 1)) {
      this.setState({inView: refKey, inViewIndex: index})
    }

  }

  returnRef = (ref, refKey) => this[refKey] = ref

  render() {

    const { data, transition } = this.props
    const dataArray = data ? Object.values(data) : []

    return (
      <div style={transition && transition.style}>
        <Menu
          sections={[
            'hair',
            'makeup',
            'stylist',
            'grooming',
            'manicurist',
            'color',
            'special-bookings'
          ]}
          scrollToSection={this.scrollToSection}
          currentSection={this.state.inViewIndex}
        />

        {
          dataArray && dataArray.map((type, index) => {
              const refKey = Object.keys(data)[index]
              return (
                <ScrollPercentage
                  key={refKey}
                  //onChange={(percentage, inView) => this.handleChange({percentage, inView, index, refKey})}
                  innerRef={(ref) => this.returnRef(ref, refKey)}
                  //threshold={1 - (index / 100)}
                >
                {(percentage, inView) => {
                  return (
                    <ColumnWidth
                      viewportUnit={this.state.viewportUnit}
                      vwUnits={this.state.vwUnits}
                      limit={this.state.limit}
                      index={index}
                      refKey={refKey}
                      onChange={this.handleChange}
                      inView={inView}
                      active={this.state.inViewIndex === index}
                      percentage={percentage.toPrecision(2)}
                    >
                      <NameList type={type} />
                    </ColumnWidth>
                  )
                }
                }
                </ScrollPercentage>
              )
            }
          )
        }

        <div
          css={{
            height: `100vh`,
          }}
        ></div>

      </div>

    )

  }

}

export default withWindowSizeListener(ArtistsPage)

export const query = graphql`
  query ArtistsQuery {
    hair: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "hair"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    makeup: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "makeup"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    stylist: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "stylist"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    grooming: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "grooming"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    manicurist: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "manicurist"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    color: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "color"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
    specialBookings: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/artists/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "special-bookings"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
  }
`