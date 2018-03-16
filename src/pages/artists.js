import React, { Component } from 'react'

import { withWindowSizeListener } from '../utils/windowResizeListener'

import { ScrollTop } from '../components/Scroll'

import Menu from '../components/Menu/Artists'
import ColumnWidth from '../components/Columns/ColumnWidth'

import ScrollPercentage from 'react-scroll-percentage'


const columnPixelWidth = 576
const leftOffset = 300

const ROWS = 10

function computeColumns(data) {

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


  const rows = Math.ceil(artists.length / dataArray.length)

  // console.log('dataArray.length: ', dataArray.length)
  // console.log('artists.length: ', artists.length)
  // console.log('rows: ', rows)

  // divide artists over columns
  const columns = artists.reduce((acc, cell, idx) => {
    const column = Math.floor(idx / rows);
    acc[column] = acc[column] ? [...acc[column], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  return columns
}


function computeFirsts (data) {

  if (!data.length > 0) { return [] }

  return data.length > 0 && data.map(column => {

    const first = column.filter((artist, index) => {
      return artist.first
    })

    const last = column.filter((artist, index) => {
      return artist.last
    })

    return first.length > 0 ? first[0].type : ''
  })

}


function computeFirstOrLast(data) {

  if (!data.length > 0) { return [] }

  return data.length > 0 && data.map(column => {

    const first = column.filter((artist, index) => {
      return artist.first
    })

    const last = column.filter((artist, index) => {
      return artist.last
    })

    let key

    if (first.length > 0 && last.length > 0) {
      key = first[0].type
    } else if (first.length > 0) {
      key = first[0].type
    } else if (last.length > 0) {
      key = last[0].type
    } else {
      key = column[0].type
    }

    return key

  })

}

class ArtistsPage extends Component {

  constructor(props) {
    super(props)

    const columns = computeColumns(props.data)
    this.state = {
      inViewIndex: 0,
      inViewKey: 'hair',
      columns,
      columnFirsts: computeFirsts(columns),
      columnFirstOrLast: computeFirstOrLast(columns)
    }

  }

  componentDidMount() {

    const { data } = this.props
    //console.log('columns: ', computeColumns(data, ROWS))

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
    // here "key" is the name of the type
    // we search for the value in columnFirsts and
    // return the index, which we use as a dom ref
    const index = this.state.columnFirsts.findIndex(value => key === value)
    ScrollTop(this[index.toString()], {duration: 500, offset: 0, align: 'top'})
  }

  handleChange = ({percentage, inView, index}) => {
    if (
      inView &&
      (
        percentage < this.state.limit &&
        percentage > (this.state.limit / 1.25)
      )
    ) {

      // could this above logic use columnFirsts?
      // not really it would need another array
      // here I could probably just changet the inViewIndex

      this.setState({
        inViewKey: this.state.columnFirstOrLast[index],
        inViewIndex: index
      })
    }

  }

  handleOnHover = (key) => {
    console.log('handleOnHover: ', key)
    this.setState({inViewKey: key})
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
          currentSection={this.state.inViewKey}
        />
        {
          this.state.vwUnits && data && this.state.columns.map((column, index) => {
              return (
                <ScrollPercentage
                  key={index}
                  innerRef={(ref) => this.returnRef(ref, index.toString())}
                >
                {(percentage, inView) => {
                  return (
                    <ColumnWidth
                      viewportUnit={this.state.viewportUnit}
                      vwUnits={this.state.vwUnits}
                      limit={this.state.limit}
                      index={index}
                      onChange={this.handleChange}
                      inView={inView}
                      inViewKey={this.state.inViewKey}
                      active={this.state.inViewIndex === index}
                      percentage={percentage.toPrecision(4)}
                      column={column}
                      onHover={this.handleOnHover}
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
            cover {
              childImageSharp {
                sizes(maxWidth: 2600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`