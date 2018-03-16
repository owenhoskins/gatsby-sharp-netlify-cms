const path = require('path');
const _ = require('lodash');
const Promise = require(`bluebird`)
const loadYaml = require('./loadYaml')
const slug = require(`slug`)

const { createFilePath } = require(`gatsby-source-filesystem`);


const adminConfig = loadYaml('./static/admin/config.yml')

const adjustImagePath = nodePath => image => {
  if (_.isString(image)) {
    if (image.indexOf(adminConfig.public_folder) === 0) {
      const nextImage = path.relative(
        path.dirname(nodePath),
        path.join(
          __dirname,
          adminConfig.media_folder,
          image.substr(adminConfig.public_folder.length)
        )
      )
      //console.log('Adjusted image path', nextImage)
      return nextImage
    }
  }
  return image
}

exports.onCreateNode = ({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) => {
  const { frontmatter } = node
  if (frontmatter) {
    const adjust = adjustImagePath(node.fileAbsolutePath)
    const { portrait, cover } = frontmatter
    if (portrait) {
      node.frontmatter.portrait = adjust(portrait)
    }
    if (cover) {
      node.frontmatter.cover = adjust(cover)
    }
    const { portfolios } = frontmatter
    if (portfolios) {
      node.frontmatter.portfolios.forEach(obj => {
        const { gallery } = obj
        if (gallery) {
          obj.gallery.forEach(obj => {
            obj.image = adjust(obj.image)
          })
        }
      })
    }
  }

  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {

    let slug
    const { frontmatter } = node
    const relativeFilePath = createFilePath({ node, getNode, basePath: `pages` })

    if (frontmatter) {
      slug = relativeFilePath.replace(/artists/g,`${node.frontmatter.type}`);
    } else {
      slug = relativeFilePath
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {

    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                path
                kind
                title
                instagram_handle
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return reject(result.errors);
      }
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {

        // here we can inspect node.fields.slug for
        // `artist`, `service`, or `about`

        if (node.frontmatter.kind === `artist`) {

          createPage({
            path: node.fields.slug,
            component: path.resolve(`src/templates/artist.js`),
            context: {
              instagram_handle: node.frontmatter.instagram_handle,
              title: node.frontmatter.title,
              slug: node.fields.slug
            }
          });

        } else {

          createPage({
            path: node.fields.slug,
            component: path.resolve(`src/templates/service.js`),
            context: {
              slug: node.fields.slug
            }
          });

        }

      });
      resolve()
    })
    // ==== END ARTISTS ====
  })
}
