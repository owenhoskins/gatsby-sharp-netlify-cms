import React from 'react';
import Helmet from 'react-helmet';
import PhotoGallery from '../components/Gallery/'
import Img from 'gatsby-image'

const renderImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        float: 'left',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}

export default function Template({ data }) {
  console.log(`Artist template data`, data)
  const { markdownRemark: post } = data;
  const { frontmatter: { portfolios } } = post
  const { photos = [] } = data
  // how does destructuring with defaults work again with nested things

  //console.log('portfolios: ', portfolios)
  //console.log('photos: ', photos)

  return (
    <section>
      <Helmet title={`${post.frontmatter.title}`} />
      <div>
        <h1>
          {post.frontmatter.title}
        </h1>
        <div>
          {
            portfolios && portfolios.map(portfolio => {
                const gallery = portfolio.gallery && portfolio.gallery.map(({image}) => {
                  if (image && image.childImageSharp) {
                    const { childImageSharp: { sizes }} = image
                    const { aspectRatio, src, srcSet } = sizes
                    return {
                      width: aspectRatio, height: 1, src,
                      srcSet: srcSet.split(","),
                      sizes: [sizes.sizes],
                      originalSizes: sizes,
                    }
                  } else {
                    console.log("!!does not have childImageSharp: ", image)
                  }
                })
                return (
                  <div>
                    <h1>{ portfolio.title }</h1>
                    <PhotoGallery
                      renderImage={renderImage}
                      photos={ gallery }
                    />
                  </div>
                )
            })
          }
        </div>
        <h2>Instagram</h2>
        {
          photos.edges && photos.edges.map(
            ({ node: { id, media }}) => {
              return <div style={{display: 'inline-block'}}><img src={ media }/></div>
            }
          )
        }
        <h2>Biography</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query ArtistByPath(
    $path: String!,
    $instagram_handle: String!,
    $permalink: String!
  ) {
    photos: allInstagramPhoto(filter: {username: {eq: $instagram_handle}}) {
      edges {
        node {
          id
          time
          media
          text
          username
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
        portfolios {
          title
          gallery {
            image {
              childImageSharp {
                sizes(maxWidth: 300) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
        videos {
          title
          video_url
        }
        image {
          childImageSharp {
            sizes(maxWidth: 300) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
