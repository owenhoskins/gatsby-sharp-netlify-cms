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
  const { followers: { followers } } = data
  const { vimeo: { videos = [] } } = data

  return (
    <section>
      <Helmet title={`${title}`} />
      <Responsive maxWidth={`48em`}>
        <MobileGallery
          title={title}
          cover={cover}
          portfolios={portfolios || []}
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
            portfolios={portfolios || []}
            videos={videos}
            instagram={insta}
            followers={followers}
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
  query ArtistByPath($path: String!, $instagram_handle: String!, $title: String!) {
    followers: instagramPhoto(username: {eq: $instagram_handle}) {
      followers
    }
    instagram: allInstagramPhoto(filter: {username: {eq: $instagram_handle}}) {
      edges {
        node {
          id
          media
          followers
        }
      }
    }
    vimeo: vimeoThumbnail(title: {eq: $title}) {
      videos {
        name
        poster
        id
        ratio
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
        enquire
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
                sizes(maxWidth: 1600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
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
