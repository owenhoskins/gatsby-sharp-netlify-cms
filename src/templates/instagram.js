
import React from 'react';

export default function Template({ data: { photos } }) {
  return (
    <div>
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
      followers
    }
  }
`;
