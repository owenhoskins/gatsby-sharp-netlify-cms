import React from 'react'
import Link from 'gatsby-link'
import ScrollHorizontal from 'react-scroll-horizontal'
import { HeaderMD } from '../components/Styled'

const IndexPage = ({
  data: {
    hair,
    makeup,
    stylist,
    grooming,
    manicurist,
    color
  }
}) => (
  <div
    css={{
      height: '100vh',
      paddingTop: '15rem',
      marginLeft: '15rem'
    }}
  >
    <ScrollHorizontal
      pageLock
      reverseScroll
    >
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Hair`}</HeaderMD>
        {
          hair && hair.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Makeup`}</HeaderMD>
        {
          makeup && makeup.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Stylist`}</HeaderMD>
        {
          stylist && stylist.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Grooming`}</HeaderMD>
        {
          grooming && grooming.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Manicurist`}</HeaderMD>
        {
          manicurist && manicurist.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
      <div css={{width: `20rem`, height: `100%`}}>
        <HeaderMD>{`Color`}</HeaderMD>
        {
          color && color.edges.map(
            ({ node: { frontmatter }}) => {
              return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
            }
          )
        }
      </div>
    </ScrollHorizontal>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    hair: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "hair"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
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
        id: { regex: "/pages/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "makeup"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
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
        id: { regex: "/pages/"},
        frontmatter: {kind: {eq: "artist"}, type: {eq: "stylist"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
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