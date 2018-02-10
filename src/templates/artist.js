import React from 'react';
import Helmet from 'react-helmet';
import Responsive from 'react-responsive'

import { Grid, Row, Col } from '../components/Grid'
import MobileGallery from '../components/Gallery/Mobile'
import DesktopGallery from '../components/Gallery/Desktop'

export default function Template({ data }) {
  const { markdownRemark: artist } = data;
  const {
    frontmatter: {
      portfolios = [],
      videos = [],
      portrait,
      instagram_handle,
      type,
      title,
      cover,
      enquire
    }
  } = artist
  const { html: biography } = artist
  const { instagram: { edges: insta = [] } } = data
  const { follows: { follows } } = data

  return (
    <section>
      <Helmet title={`${title}`} />
      <Responsive maxWidth={`48em`}>
        <MobileGallery
          title={title}
          portfolios={portfolios}
          videos={videos}
          instagram={insta}
          biography={biography}
          portrait={portrait}
        />
      </Responsive>
      <Responsive minWidth={`48em`}>
        <div>
          <DesktopGallery
            title={title}
            cover={cover}
            type={type}
            portfolios={portfolios}
            videos={videos}
            instagram={insta}
            follows={follows}
            biography={biography}
            portrait={portrait}
            instagram_handle={instagram_handle}
            enquire={enquire}
          />
        </div>
      </Responsive>
    </section>
  );
}

export const pageQuery = graphql`
  query ArtistByPath($path: String!, $instagram_handle: String!) {
    follows: instagramPhoto(username: {eq: $instagram_handle}) {
      follows
    }
    instagram: allInstagramPhoto(filter: {username: {eq: $instagram_handle}}) {
      edges {
        node {
          id
          media
          follows
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        type
        order
        instagram_handle
        cover {
          childImageSharp {
            sizes(maxWidth: 2600, quality: 100) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        portfolios {
          title
          gallery {
            image {
              childImageSharp {
                sizes(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
        videos {
          title
          url
        }
        portrait {
          childImageSharp {
            resolutions(width: 400) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }
  }
`;
