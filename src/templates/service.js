
import React from 'react';

export default function Template() {
  return (
    <div>
    </div>
  )
}


export const pageQuery = graphql`
  query ServiceBySlug($slug: String!) {
    service: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        order
      }
    }
  }
`;
