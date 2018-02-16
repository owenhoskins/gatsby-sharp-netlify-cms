const grayMatter = require(`gray-matter`)
const crypto = require(`crypto`)
const _ = require(`lodash`)

module.exports = async function onCreateNode(
  { node, getNode, loadNodeContent, boundActionCreators },
  pluginOptions
) {
  const { createNode, createParentChildLink } = boundActionCreators

  // We only care about markdown content.
  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return
  }

  const content = await loadNodeContent(node)
  let data = grayMatter(content, pluginOptions)


  // Convert date objects to string. Otherwise there's type mismatches
  // during inference as some dates are strings and others date objects.
  if (data.data) {
    data.data = _.mapValues(data.data, v => {
      if (_.isDate(v)) {
        return v.toJSON()
      } else {
        return v
      }
    })
  }

  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`)
  const vimeoNode = {
    id: `${node.id} >>> VimeoThumbnail`,
    children: [],
    parent: node.id,
    internal: {
      content,
      contentDigest,
      type: `VimeoThumbnail`,
    },
    title: data.data.title,
    videos: data.data.videos || []
  }
  //console.log('onCreateNode: data.data', data.data)
/*
  if (vimeoNode.frontmatter.videos) {
    // console.log('vimeoNode: ', vimeoNode.frontmatter.videos)

    // loop through videos and make requests with vimeo api.

    Promise.all(vimeoNode.frontmatter.videos.map(video => {

        console.log('path:', `/videos/${video.url}`)
        // "error":"The requested page could not be found"

        return client.request({
          path: `/videos/${video.url}`,
        }, function (error, body, status_code, headers) {
          if (error) {
            console.log('error');
            console.log(error);
          } else {
            //console.log('body');
            //console.log(body);

            const { sizes } = body.pictures
            const poster = sizes[sizes.length - 1].link
            const name = body.name
            console.log('poster: ', name, poster)
          }
        });
    })).catch(error => {
        console.log(error);
    });
  }
*/
  // how to reference this if we make it into a graphql node?
  // save the title from the frontmatter




  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    vimeoNode.fileAbsolutePath = node.absolutePath
  }

  createNode(vimeoNode)
  createParentChildLink({ parent: node, child: vimeoNode })
}