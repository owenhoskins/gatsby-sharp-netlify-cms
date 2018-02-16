import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data: { pages } }) => (
  <div>
    <h1>SWA</h1>
    {
      pages.edges && pages.edges.map(
        ({ node: { frontmatter }}) => {
          return <div key={ frontmatter.path } style={{display: 'block'}}><Link to={frontmatter.path}>{frontmatter.title}</Link></div>
        }
      )
    }
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    pages: allMarkdownRemark(
      filter: {
        id: { regex: "/pages/"},
        frontmatter: {kind: {eq: "artist"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}
    ) {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }

  }
`