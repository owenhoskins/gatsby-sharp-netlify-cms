import React from 'react';
import Helmet from 'react-helmet';
import Responsive from 'react-responsive'

import { Grid, Row, Col } from '../components/Grid'
import MobileGallery from '../components/Gallery/Mobile'
import DesktopGallery from '../components/Gallery/Desktop'

export default function Template({ data, transition }) {
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
  //const { instagram: { edges: insta = [] } } = data
  const { instagram = {} } = data
  const insta = instagram ? instagram.edges : []
  //const { followers: { followers } } = data
  const followers = data.followers && data.followers.followers
  const { vimeo: { videos = [] } } = data

  return (
    <section
      //style={transition && transition.style}
    >
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
            transition={transition}
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
  query ArtistByPath($slug: String!, $instagram_handle: String!, $title: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
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
