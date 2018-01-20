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
  const { markdownRemark: post } = data;
  const photos = []
  post.frontmatter.images.forEach(({
    image
    //image: { childImageSharp: { sizes }}
  }) => {
    if (image && image.childImageSharp) {
      const { childImageSharp: { sizes }} = image
      const { aspectRatio, src, srcSet } = sizes
      photos.push({
        width: aspectRatio, height: 1, src,
        srcSet: srcSet.split(","),
        sizes: [sizes.sizes],
        originalSizes: sizes,
      })
    } else {
      console.log("!!does not have childImageSharp: ", image)
    }
  })

  return (
    <section>
      <Helmet title={`${post.frontmatter.title}`} />
      <div>
        <h1>
          {post.frontmatter.title}
        </h1>
        <div>
          <PhotoGallery
            renderImage={renderImage}
            photos={ photos }
          />
        </div>
        <h2>Biography</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query GalleryByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        images {
          image {
            childImageSharp {
             sizes(maxWidth: 700) {
                ...GatsbyImageSharpSizes
             }
            }
          }
        }
      }
    }
  }
`;
