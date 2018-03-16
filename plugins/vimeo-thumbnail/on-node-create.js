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

  // We only care about markdown from the directory artists
  if (node.relativeDirectory !== `artists`) {
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

  // we only care about artists with videos
  if (!data.data.videos) {
    return
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
    videos: data.data.videos
  }

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    vimeoNode.fileAbsolutePath = node.absolutePath
  }

  createNode(vimeoNode)
  createParentChildLink({ parent: node, child: vimeoNode })

}