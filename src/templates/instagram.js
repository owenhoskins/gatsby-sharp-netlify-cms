import React from 'react';

export default function Template({ data: { instagramPhoto } }) {
  console.log('Instagram Template data: ', instagramPhoto)
  return (
    <div><img src={ instagramPhoto.media } /></div>
  )
}


export const pageQuery = graphql`
  query InstagramById($id: String!) {
    instagramPhoto(id: { eq: $id }) {
      id
      media
    }
  }
`;
