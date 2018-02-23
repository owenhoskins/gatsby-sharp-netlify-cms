import React, { Component } from 'react'
import Link from 'gatsby-link'
import { ScrollHorizontal } from '../components/Scroll'
import { HeaderMD, HeaderLG } from '../components/Styled'

import Menu from '../components/Menu/Types'


export default class IndexPage extends Component {

  state = {
    currentSection: 0
  }

  scrollToSection = (value) => {
    this.setState({currentSection: value})
  }

  render() {

    const {
      data: {
        hair,
        makeup,
        stylist,
        grooming,
        manicurist,
        color
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
          title={`artists`}
          sections={[
            'hair',
            'makeup',
            'stylist',
            'grooming',
            'manicurist',
            'color'
          ]}
          scrollToSection={this.scrollToSection}
          currentSection={this.state.currentSection}
        />

        <ScrollHorizontal
          pageLock
          reverseScroll
          currentSection={this.state.currentSection}
          distance={336}
        >
          <div css={{width: `21rem`, height: `100%`}}>
            {/*<HeaderMD>{`Hair`}</HeaderMD>*/}
            {
              hair && hair.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return (
                    <HeaderLG
                      key={fields.slug}
                    >
                      <Link to={fields.slug}>{frontmatter.title}</Link>
                    </HeaderLG>
                  )
                }
              )
            }
          </div>
          <div css={{width: `21rem`, height: `100%`}}>
            {/*<HeaderMD>{`Makeup`}</HeaderMD>*/}
            {
              makeup && makeup.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return (
                    <HeaderLG
                      key={fields.slug}
                    >
                      <Link to={fields.slug}>{frontmatter.title}</Link>
                    </HeaderLG>
                  )
                }
              )
            }
          </div>
          <div css={{width: `21rem`, height: `100%`}}>
            {/*<HeaderMD>{`Stylist`}</HeaderMD>*/}
            {
              stylist && stylist.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return (
                    <HeaderLG
                      key={fields.slug}
                    >
                      <Link to={fields.slug}>{frontmatter.title}</Link>
                    </HeaderLG>
                  )
                }
              )
            }
          </div>
          <div css={{width: `21rem`, height: `100%`}}>
            <HeaderLG>{`Grooming`}</HeaderLG>
            {
              grooming && grooming.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return <div key={fields.slug} style={{display: 'block'}}><Link to={fields.slug}>{frontmatter.title}</Link></div>
                }
              )
            }
          </div>
          <div css={{width: `21rem`, height: `100%`}}>
            {
              manicurist && manicurist.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return (
                    <HeaderLG
                      key={fields.slug}
                    >
                      <Link to={fields.slug}>{frontmatter.title}</Link>
                    </HeaderLG>
                  )
                }
              )
            }
          </div>
          <div css={{width: `21rem`, height: `100%`}}>
            <HeaderLG>{`Color`}</HeaderLG>
            {
              color && color.edges.map(
                ({ node: { fields, frontmatter }}) => {
                  return <div key={fields.slug} style={{display: 'block'}}><Link to={fields.slug}>{frontmatter.title}</Link></div>
                }
              )
            }
          </div>
        </ScrollHorizontal>
      </div>

    )

  }

}

export const query = graphql`
  query IndexQuery {
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
            path
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
            path
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
            path
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
            path
            title
            type
          }
        }
      }
    }
  }
`