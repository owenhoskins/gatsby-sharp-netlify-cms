const Promise = require(`bluebird`)
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require(`graphql`)

const Vimeo = require(`vimeo`).Vimeo
const client = new Vimeo('ac9fe65658e5a30b5c4a64181df431909e9570f0', 'o8hsyLZQ3ovm+Gom8os/+zc1QuOpNaCx6IFABkqIxP2JOseUI6fso6EMqcZAMAXLWBURFNQ45g5LIi5LBJ9+mRTH4U/fxsa1OtDt1SnZpW8Vq8/rGHBNgfiyVVTxsy/N', '6abb774504045138f6aa817ffcabc03c')

const astCacheKey = node =>
  `transformer-vimeo-markdown-ast-${
    node.internal.contentDigest
  }-${pluginsCacheStr}-${pathPrefixCacheStr}`

module.exports = (
  { type, store, pathPrefix, getNode, cache },
  pluginOptions
) => {
  if (type.name !== `VimeoThumbnail`) {
    return {}
  }
  //console.log('vimeo-thumbnail: ', type, store, pathPrefix, getNode, cache)
  console.log('TYPE: ')
  // console.log(type)
  //console.log('STORE: ')
  //console.log(store)
  //console.log('PATHPREFIX: ')
  //console.log(pathPrefix)
  //console.log('GETNODE: ')
  //console.log(getNode)
  //console.log('CACHE: ')
  //console.log(cache)

/*
https://github.com/vimeo/vimeo.js/issues/53
const ul = new Promise(resolve => {
lib.request({
  method: 'POST',
  path: `/me/videos/`,
  query: { type: 'streaming' }
}, (err, body, statusCode) => {
  resolve(body);
});
});
*/

// type.nodes

  return new Promise((resolve, reject) => {

    console.log('YO NEW PROMISE!')

    async function getAST(vimeoNodes) {

      console.log('getAST: ', vimeoNodes)

      const ast = await new Promise((resolve, reject) => {

        const videos = []
        //vimeoNodes.map(node => {})
        Promise.each(vimeoNodes, node => {

          Promise.each(node.videos, video => {

            client.request(/*options*/{
              path: `/videos/${video.url}`,
            }, /*callback*/function (error, body, status_code, headers) {
              if (error) {
                console.log('error');
                console.log(error);
              } else {
                //console.log('body');
                //console.log(body);

                const { sizes } = body.pictures
                const poster = sizes[sizes.length - 1].link
                const name = body.name
                console.log('name, poster: ', name, poster)
                videos.push({
                  name,
                  poster,
                  title: vimeoNode.title
                })
                /*Promise.resolve({
                  name,
                  poster
                })*/
              }
            });
          }).then(() => {
            console.log('Promise.each then...', videos)
            resolve(videos)
          })

        })

      })

      return ast
    }


    const ListType = new GraphQLObjectType({
      name: `Vimeo`,
      fields: {
        title: {
          type: GraphQLString,
          resolve(vimeo) {
            return vimeo.title
          },
        },
        poster: {
          type: GraphQLString,
          resolve(vimeo) {
            return vimeo.poster
          },
        },
      },
    })


    // type.nodes

    return resolve({
      videos: {
        type: new GraphQLList(ListType),
        resolve(vimeoNode) {
          console.log('return resolve:', getAST(vimeoNode))
          return getAST(type.nodes)
        },
      },
    })
  })
}

/*

    async function getHeadings(markdownNode) {
      const cachedHeadings = await cache.get(headingsCacheKey(markdownNode))
      if (cachedHeadings) {
        return cachedHeadings
      } else {
        const ast = await getAST(markdownNode)
        const headings = select(ast, `heading`).map(heading => {
          return {
            value: _.first(select(heading, `text`).map(text => text.value)),
            depth: heading.depth,
          }
        })

        cache.set(headingsCacheKey(markdownNode), headings)
        return headings
      }
    }


  headings: {
    type: new GraphQLList(HeadingType),
    args: {
      depth: {
        type: HeadingLevels,
      },
    },
    resolve(markdownNode, { depth }) {
      return getHeadings(markdownNode).then(headings => {
        if (typeof depth === `number`) {
          headings = headings.filter(heading => heading.depth === depth)
        }
        return headings
      })
    },
  },
*/