import React, { Component } from 'react'
import Link from 'gatsby-link'
import { ScrollHorizontal } from '../components/Scroll'
import { HeaderMD, HeaderLG } from '../components/Styled'

import Menu from '../components/Menu/Types'


export default class ServicesPage extends Component {

  state = {
    currentSection: 0
  }

  scrollToSection = (value) => {
    this.setState({currentSection: value})
  }

  render() {

    const {
      data: {
        services
      }
    } = this.props

    return (
      <div
        css={{
          height: '100vh',
          paddingTop: '15rem',
          marginLeft: '21rem'
        }}
      >

        <Menu
          title={`services`}
          sections={
            services && services.edges.map(
              ({ node: { fields, frontmatter }}) => frontmatter.title)
          }
          scrollToSection={this.scrollToSection}
          currentSection={this.state.currentSection}
        />

        <ScrollHorizontal
          pageLock
          reverseScroll
          currentSection={this.state.currentSection}
          distance={640}
        >
          {
            services && services.edges.map(
              ({ node: { fields, frontmatter }}) => {
                return (
                  <div css={{width: `40rem`, height: `100%`}}>
                    <p css={{maxWidth: `26rem`}}>{frontmatter.description}</p>
                  </div>
                )
              }
            )
          }
        </ScrollHorizontal>
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