import React, { Component } from 'react'
import Link from 'gatsby-link'
import { ScrollHorizontal, ScrollTop } from '../components/Scroll'
import { HeaderXS, HeaderSM, HeaderMD, HeaderLG } from '../components/Styled'
import { Motion, spring, presets } from 'react-motion'
const springConfig = presets.noWobble

import Menu from '../components/Menu/Services'

import Columns from '../components/Columns'

import ScrollPercentage from 'react-scroll-percentage'

const calcPercentage = percentage => Math.floor(percentage * 100)

const leftEdge = 0.75
const rightEdge = 0.2

export default class ArtistsPage extends Component {

  state = {
    inViewIndex: 0,
    inView: '',
    to: '',
    totalPercentage: 0
  }

  componentDidMount() {
    if (this.props.location.hash) {
      this.scrollToSection(0, this.props.location.hash.replace('#', ''))
    }
  }

  scrollToSection = (i, key) => {
    console.log('scrollToSection: ', this[key])
    ScrollTop(this[key], {duration: 500, offset: 0, align: 'middle'})
  }

/*  handleChange = ({percentage, inView, index, refKey}) => {
    const node = this[refKey]

    // console.log(`handleChange ${index} / ${refKey} / ${percentage} / ${inView}`)

    if (inView && (percentage >= 0.40 && percentage <= 0.50)) {
      this.setState({inView: refKey, inViewIndex: index})
    }

  }
*/

  handleChange = (totalPercentage) => {
    this.setState({totalPercentage})
  }

  handleClick(e, to, type) {
    e.preventDefault()
    console.log('handleClick: ', to, type)
    this.setState({to: type})
    // here we could set the state
    // the menu component would be passed that state
    // and could animate the
    setTimeout( () => {
      window.___navigateTo(to)
    }, 1000)
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



          // 1% is past the viewport
          // .5% is dead centered in the viewport
          // 0% is before the viewport

          <ScrollPercentage
            //key={refKey}
            //onChange={(percentage, inView) => this.handleChange({percentage, inView, index, refKey})}
            //innerRef={(ref) => this.returnRef(ref, refKey)}
            onChange={this.handleChange}
          >
            <div css={{position: 'fixed'}}>{this.state.totalPercentage.toPrecision(2)}%</div>
            <Columns
              data={data}
              dataArray={dataArray}
              totalPercentage={this.state.totalPercentage}
            />
          }
        </ScrollPercentage>
        }
      </div>
    )
  }
}

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