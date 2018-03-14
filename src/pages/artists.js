import React, { Component } from 'react'

import { withWindowSizeListener } from '../utils/windowResizeListener'

import { ScrollTop } from '../components/Scroll'

import Menu from '../components/Menu/Services'
import ColumnWidth from '../components/Columns/ColumnWidth'

import ScrollPercentage from 'react-scroll-percentage'


const columnPixelWidth = 576
const leftOffset = 300

function computeColumns(data, rows) {

  const dataArray = data ? Object.values(data) : []
  if (!dataArray.length > 0) { return [] }

  const types = dataArray.length > 0 && dataArray.map((type, index) => {
    return type.edges.map((edges, i) => {
      return {
        ...edges.node.fields,
        ...edges.node.frontmatter,
        first: i === 0,
        last: (type.edges.length - 1) === i
      }
    })
  })
  const artists = [].concat.apply([], types)

  // divide artists over columns
  const columns = artists.reduce((acc, cell, idx) => {
    const column = Math.floor(idx / rows);
    acc[column] = acc[column] ? [...acc[column], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  return columns
}

class ArtistsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inViewIndex: 0,
      inView: 'hair'
    }

  }

  componentDidMount() {

    const { data } = this.props
    console.log('columns: ', computeColumns(data, 6))

    if (this.props.location.hash) {
      // console.log('this.props.location.hash: ', this.props.location.hash)
      this.scrollToSection(this.props.location.hash.replace('#', ''))
    } else {
      this.scrollToSection('hair')
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (typeof(prevState.vwUnits) === 'undefined') {
      // console.log('vwUnits is undefined!')
      if (this.props.location.hash) {
        // console.log('this.props.location.hash: ', this.props.location.hash)
        this.scrollToSection(this.props.location.hash.replace('#', ''))
      } else {
        this.scrollToSection('hair')
      }
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

      const vwUnitPixelWidth = windowWidth / 100 // 25.6
      const vwUnits = columnPixelWidth / vwUnitPixelWidth

      const limit = 1 - (leftOffset / windowWidth)

      this.setState({
        viewportUnit: windowHeight >= windowWidth ? 'vh' : 'vw',
        vwUnitPixelWidth,
        vwUnits,
        limit
      })


    }

  }

  scrollToSection = (key) => {
    ScrollTop(this[key], {duration: 500, offset: 0, align: 'top'})
  }

  handleChange = ({percentage, inView, index, refKey}) => {
    //console.log(`handleChange ${inView} / ${index} / ${refKey} / ${percentage}`)
    if (
      inView &&
      (
        percentage < this.state.limit &&
        percentage > (this.state.limit / 1.25)
      )
    ) {
      this.setState({inView: refKey, inViewIndex: index})
    }

  }

  returnRef = (ref, refKey) => this[refKey] = ref

  render() {

    const { data, transition } = this.props

    return (
      <div style={transition && transition.style}>
        <Menu
          sections={[
            'hair',
            'makeup',
            'stylist',
            'grooming',
            'manicurist',
            'special-bookings'
          ]}
          scrollToSection={this.scrollToSection}
          currentSection={this.state.inViewIndex}
        />
        {
          this.state.vwUnits && data && computeColumns(data, 6).map((column, index) => {
              const refKey = Object.keys(data)[index]
              return (
                <ScrollPercentage
                  key={refKey}
                  innerRef={(ref) => this.returnRef(ref, refKey)}
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
                      inViewKey={this.state.inView}
                      active={this.state.inViewIndex === index}
                      percentage={percentage.toPrecision(4)}
                      column={column}
                    />
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
      sort: {order: ASC, fields: [frontmatter___title]}
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
      sort: {order: ASC, fields: [frontmatter___title]}
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
      sort: {order: ASC, fields: [frontmatter___title]}
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
      sort: {order: ASC, fields: [frontmatter___title]}
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
      sort: {order: ASC, fields: [frontmatter___title]}
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
      sort: {order: ASC, fields: [frontmatter___title]}
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