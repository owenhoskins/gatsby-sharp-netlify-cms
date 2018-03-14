
import React from 'react';

export default function Template() {
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
          media
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
