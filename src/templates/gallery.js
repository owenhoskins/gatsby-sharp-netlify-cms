import React from 'react';

export default ({ data }) => {
  console.log('gallery.js data: ', data)
  const { markdownRemark: post } = data;
  return (
    <div>
      <h2>{post && post.frontmatter && post.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const pageQuery = graphql`
  query Page($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
