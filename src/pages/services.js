import React, { Component } from 'react'
import Link from 'gatsby-link'
import { ScrollHorizontal, ScrollTop } from '../components/Scroll'
import { HeaderXS, Blurry, HeaderMD } from '../components/Styled'

import Menu from '../components/Menu/Services'

import ScrollPercentage from 'react-scroll-percentage'

const calcPercentage = percentage => Math.floor(percentage * 100)

export default class ServicesPage extends Component {

  state = {
    inViewIndex: 0,
    inView: '',
    isHovered: true
  }

  scrollToSection = (i, key) => {
    this.setState({isHovered: false})
    ScrollTop(this[key], {duration: 500, offset: 0, align: 'top'})
  }

  handleChange = ({percentage, inView, index, refKey}) => {
    const node = this[refKey]

    // console.log(`handleChange ${index} / ${refKey} / ${percentage} / ${inView}`)

    if (inView && (percentage >= 0.25 && percentage <= 0.75)) {
      this.setState({inView: refKey, inViewIndex: index})
    }

  }

  onMouseEnter = () => {
    this.setState({isHovered: true})
  }

  onMouseLeave = () => {
    this.setState({isHovered: false})
  }


  returnRef = (ref, refKey) => this[refKey] = ref

  render() {

    const {
      data: {
        services
      },
      transition
    } = this.props

    return (
      <div style={transition && transition.style}>
        <Menu
          isHovered={this.state.isHovered}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          sections={
            services && services.edges.map(
              ({ node: { fields, frontmatter }}) => frontmatter.title)
          }
          scrollToSection={this.scrollToSection}
          currentSection={this.state.inViewIndex}
        />
      <div
        css={{
          textAlign: 'right',
          width: '14rem',
          paddingRight: '2rem',
          position: 'fixed',
          bottom: '3rem',
          left: 0,
          zIndex: 2000,
          opacity: 1,
          transition: 'opacity 1000ms ease-out'
        }}
      >
        <Blurry>
          <a href={`mailto:enquire@starworksartists.com`}>
            {`Enquire`}
          </a>
        </Blurry>
      </div>

        {
          services && services.edges.map(
            ({ node: { fields, frontmatter }}, index) => {
              const refKey = frontmatter.title.replace(/\s+/g, '')
              return (
                <ScrollPercentage
                  key={refKey}
                  onChange={(percentage, inView) => this.handleChange({percentage, inView, index, refKey})}
                  innerRef={(ref) => this.returnRef(ref, refKey)}
                >
                {(percentage) => {
                  let opacity
                  if (percentage > 0.55) { // edge of menu
                    opacity = 0.5 - percentage.toPrecision(2)
                  } else if (percentage < 0.45) { // right edge
                    opacity = percentage.toPrecision(2)
                  } else {
                    opacity = percentage.toPrecision(2) * 1.5
                  }
                  return (
                  <div
                    css={{
                      width: `calc(100vw - 21rem)`,
                      height: `100vh`,
                      marginBottom: '1vh',
                    }}
                    //threshold='0.7'
                  >
                      <div
                        css={{
                          transition: `opacity 200ms linear, 800ms filter linear`,
                          position: `fixed`,
                          top: `14rem`,
                          left: `calc(100vw - 16rem)`,
                          width: `100vw`
                          //willChange:`transform`
                          // https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
                        }}
                        style={{
                          //opacity: percentage > 0.55 ? 0.6 - percentage.toPrecision(2) : percentage.toPrecision(2),
                          opacity: opacity,
                          transform: `translate3d(${-(percentage * 100) + 'vw'}, 0px, 0px)`,
                          //filter: percentage < 0.30 || percentage > 0.55 ? `blur(1px)` : `blur(0)`
                        }}
                      >
                        <HeaderMD style={{maxWidth: `40rem`}}>{frontmatter.description}</HeaderMD>
                        {/*
                        <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>
                        */}
                      </div>
                  </div>
                  )
                }
                }
                </ScrollPercentage>
              )
            }
          )
        }

        {/*<ScrollHorizontal
          pageLock
          reverseScroll
          currentSection={this.state.currentSection}
          distance={640}
        >
        </ScrollHorizontal>*/}
      </div>

    )

  }

}

export const query = graphql`
  query ServicesQuery {
    services: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/services/"},
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
            description
          }
        }
      }
    }
  }
`