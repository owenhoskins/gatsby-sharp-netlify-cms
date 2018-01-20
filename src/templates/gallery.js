import React from 'react';

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <div>
      {post.frontmatter.title}
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
