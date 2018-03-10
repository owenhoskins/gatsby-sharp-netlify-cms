import React, { Component } from 'react'
import Link from 'gatsby-link'
import { ScrollHorizontal, ScrollTop } from '../components/Scroll'
import { HeaderXS, HeaderSM, HeaderMD, HeaderLG } from '../components/Styled'
import { Motion, spring, presets } from 'react-motion'
const springConfig = presets.noWobble

import Menu from '../components/Menu/Services'

import ScrollPercentage from 'react-scroll-percentage'

const calcPercentage = percentage => Math.floor(percentage * 100)

const leftEdge = 0.75
const rightEdge = 0.2

export default class ArtistsPage extends Component {

  state = {
    inViewIndex: 0,
    inView: '',
    to: ''
  }

  componentDidMount() {
    if (this.props.location.hash) {
      this.scrollToSection(0, this.props.location.hash.replace('#', ''))
    }
  }

  scrollToSection = (i, key) => {
    console.log('scrollToSection: ', this[key])
    ScrollTop(this[key], {duration: 500, offset: 0, align: 'top'})
  }

  handleChange = ({percentage, inView, index, refKey}) => {
    const node = this[refKey]

    // console.log(`handleChange ${index} / ${refKey} / ${percentage} / ${inView}`)

    if (inView && (percentage >= 0.40 && percentage <= 0.50)) {
      this.setState({inView: refKey, inViewIndex: index})
    }

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
          >
          {
            //const leftEdge = 0.75
            //const rightEdge = 0.2
            (percentage) => {
              let opacity
              if (percentage > leftEdge) { // edge of menu
                opacity = 0.5 - percentage.toPrecision(2)
              } else if (percentage < rightEdge) { // right edge
                opacity = percentage.toPrecision(2)
              } else {
                opacity = percentage.toPrecision(2) * 1.5
              }

              opacity = 1

              return (
                <div>
                  {
                    dataArray && dataArray.map((type, index) => {
                      const refKey = Object.keys(data)[index]
                      // console.log('refKey: ', refKey, type)
                      return (
                        <Motion style={ { z: spring(-percentage.toPrecision(2) * 100, springConfig) } }>
                          { ({z}) => {
                            return (

                            <div
                              css={{
                                //width: `calc(100vw - 21rem)`,
                                height: `49vh`,
                                marginBottom: '1vh',
                                //backgroundColor: 'rgba(0, 0, 0, 0.1)'
                              }}
                              //threshold='0.7'
                            >
                              <div
                                css={{
                                  //transition: `opacity 200ms linear, 800ms filter linear`,
                                  display: 'flex',
                                  position: `fixed`,
                                  top: `0`,
                                  bottom: `0`,
                                  left: `calc((23rem * ${index + 1}))`,
                                  //width: `100vw`
                                  // left was 100vw
                                  //left: `calc((23rem * ${index + 1}) + 100vw)`
                                }}
                                style={{
                                  opacity: opacity,
                                  //transform: `translateX(${-(percentage * 100) + 'vw'})`,
                                  //transform: `translateX(${-(percentage * 23) + 'rem'})`,
                                  //filter: percentage < rightEdge || percentage > leftEdge ? `blur(1px)` : `blur(0)`
                                  transform: `translateX(${z}%)`
                                }}
                              >
                                <div
                                  css={{
                                    width: `21rem`,
                                    height: `29rem`,
                                    alignSelf: `center`
                                    //backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                  }}
                                >
                                  {
                                    type.edges.map(({ node: { fields, frontmatter }}) => {
                                      return (
                                        <HeaderLG
                                          key={fields.slug}
                                        >
                                          <Link
                                            to={fields.slug}
                                            onClick={e => this.handleClick(e, fields.slug, frontmatter.type)}
                                          >{frontmatter.title}</Link>
                                        </HeaderLG>
                                      )
                                    })
                                  }
                                  <p>{refKey}</p>
                                  <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>
                                </div>
                              </div>
                                {/*<p>{refKey}</p>
                                  <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>*/}
                            </div>
                          )
                        }}
                        </Motion>
                      )
                    })
                  }
                </div>
              )
            }
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