import React, { Component } from 'react'

import { withWindowSizeListener } from '../utils/windowResizeListener'

import { ScrollTop } from '../components/Scroll'
import { Blurry, HeaderMD } from '../components/Styled'

import Menu from '../components/Menu/Services'
import FullWidth from '../components/Columns/FullWidth'
import NameList from '../components/Columns/NameList'

import ScrollPercentage from 'react-scroll-percentage'

class ServicesPage extends Component {

  state = {
    inViewIndex: 0,
    inView: '',
    isHovered: true
  }

  componentDidMount() {
    if (this.props.location.hash) {
      this.scrollToSection(0, this.props.location.hash.replace('#', ''))
    } else {
      const {
        data: {
          services
        }
      } = this.props
      const refKey = services && services.edges[0].node.frontmatter.title.replace(/\s+/g, '')
      this.scrollToSection(0, refKey)
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

      this.setState({
        viewportUnit: windowHeight >= windowWidth ? 'vh' : 'vw'
      })

    }

  }

  scrollToSection = (i, key) => {
    console.log('scrollToSection: ', this[key])
    this.setState({isHovered: false})
    ScrollTop(this[key], {duration: 500, offset: window.innerHeight / 2, align: 'middle'})
  }

  handleChange = ({percentage, inView, index, refKey}) => {
    //console.log(`handleChange ${index} / ${refKey} / ${percentage}`)
    if (inView && (percentage >= 0.45 && percentage <= 1)) {
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
                  //onChange={(percentage, inView) => this.handleChange({percentage, inView, index, refKey})}
                  innerRef={(ref) => this.returnRef(ref, refKey)}
                >
                {(percentage, inView) => {
                  return (
                    <FullWidth
                      viewportUnit={this.state.viewportUnit}
                      index={index}
                      refKey={refKey}
                      onChange={this.handleChange}
                      inView={inView}
                      active={this.state.inViewIndex === index}
                      percentage={percentage.toPrecision(2)}
                      style={{height: `17rem`}}
                    >
                      <HeaderMD>{frontmatter.description}</HeaderMD>
                    </FullWidth>
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

export default withWindowSizeListener(ServicesPage)

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