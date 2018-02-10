const path = require('path');
const _ = require('lodash');
const Promise = require(`bluebird`)
const loadYaml = require('./loadYaml')
const slug = require(`slug`)

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
      console.log('Adjusted image path', nextImage)
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
    const { images } = frontmatter
    if (images) {
      node.frontmatter.images.forEach(obj => {
        obj.image = adjust(obj.image)
      })
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
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {

    graphql(`
      {
        allInstagramPhoto {
          edges {
            node {
              username
              id
              media
            }
          }
        }
      }
      `).then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return reject(result.errors);
        }
        result.data.allInstagramPhoto.edges.forEach(({ node }) => {
          //console.log('allInstagramPhoto node: ', node)
          createPage({
            path: `/${slug(node.username)}/`,
            component: path.resolve(`src/templates/instagram.js`),
            context: {
              id: node.id,
              username: node.username
            }
          });
        });
    })
    // ==== END INSTAGRAM ====
    .then(() => {
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                excerpt(pruneLength: 400)
                html
                id
                frontmatter {
                  templateKey
                  path
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

          //console.log('allMarkdownRemark node: ', node)

          const permalink = `/artist/${slug(node.frontmatter.title).toLowerCase()}`
          //console.log("permalink: ", permalink)
          // we can't pass the permalink into the graphql data.
          // how can we automatically set the path in the md file?

          createPage({
            path: permalink,
            component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
            context: {
              instagram_handle: node.frontmatter.instagram_handle,
              permalink: permalink
            }
          });
        });
        resolve()
      })
    })
    // ==== END ARTISTS ====
  })
};
