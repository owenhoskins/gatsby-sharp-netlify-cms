
import React from 'react';

export default function Template({ data: { photos } }) {
  return (
    <div>
    </div>
  )
}

export const pageQuery = graphql`
  query VimeoByTitle($title: String!) {
    photos: allVimeoThumbnail(filter: {title: {eq: $title}}) {
      edges {
        node {
          videos {
            name
            poster
          }
        }
      }
    }
  }
`;
