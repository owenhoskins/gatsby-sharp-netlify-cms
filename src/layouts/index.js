import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import slug from 'slug'
import { Baseline } from '../components/Layout'

//import Scroll from '../components/Scroll'

import './index.css'

import { window } from 'global'

const handleClickAdmin = () => {
  if(typeof window !== 'undefined') {
    if (window.netlifyIdentity) {
      if (window.netlifyIdentity.currentUser()) {
        document.location.href = "/admin/"
      } else {
        window.netlifyIdentity.open()
      }
    }
  }
}


const TemplateWrapper = ({
  children,
  // data: { pages, photos },
  ...props
}) => (
  <div>
    <Helmet
      title="Gallery pages"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
   {/*<a
      onClick={handleClickAdmin}
      href="#"
    >
      Admin
    </a>*/}
    <div css={{display: 'relative'}}>
      {/*
        pages.edges && pages.edges.map(
          ({ node: { frontmatter }}) => {
            return <div key={ frontmatter.path } style={{display: 'block'}}><a href={frontmatter.path}>{frontmatter.title}</a></div>
          }
        )
      */}
      {children()}
      <Baseline />
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


export const query = graphql`
  query LayoutQuery {

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