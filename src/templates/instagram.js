import React from 'react';

export default function Template({ /*data: { photos }*/ }) {
  /*console.log('Instagram Template data: ', data, photos)*/
  return (
    <div>
      {/*
        photos.edges && photos.edges.map(
          ({ node: { id, media }}) => {
            return <div style={{display: 'block'}}><img src={ media } /></div>
          }
        )
      */}
    </div>
  )
}


export const pageQuery = graphql`
  query InstagramById($username: String!) {
    photos: allInstagramPhoto(filter: {username: {eq: $username}}) {
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
    instagramPhoto(username: { eq: $username }) {
      id
      username
      media
      follows
    }
  }
`;
