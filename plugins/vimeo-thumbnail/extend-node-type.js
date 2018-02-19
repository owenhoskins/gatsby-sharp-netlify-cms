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
  }`

module.exports = (
  { type, store, pathPrefix, getNode, cache },
  pluginOptions
) => {
  if (type.name !== `VimeoThumbnail`) {
    return {}
  }

  async function getAST(vimeoNode) {

    const cachedAST = await cache.get(astCacheKey(vimeoNode))
    if (cachedAST) {
      return cachedAST
    } else {

      const ast = new Promise((resolve, reject) => {

        const videos = vimeoNode.videos ? vimeoNode.videos.map(video => {
          return new Promise(resolve => {
            client.request({
              path: `/videos/${video.url}`,
            }, function (error, body, status_code, headers) {
              if (error) {
                console.log('Vimeo error: ');
                console.log(error);
                reject()
              } else {
                const name = body.name
                const { sizes } = body.pictures
                const biggest = sizes[sizes.length - 1]
                const poster = biggest.link
                const aspectRatio = biggest.width / biggest.height
                const ratio = `${1 / aspectRatio * 100}%`
                resolve({
                  name,
                  poster,
                  ratio,
                  id: video.url
                })
              }
            });
          });
        }) : []

        Promise.all(videos).then((res) => {
          console.log("PROMISE ALL RES NEW: ", res)
          resolve(res)
        })

      })

      // Save new AST to cache and return
      cache.set(astCacheKey(vimeoNode), ast)
      return ast

    }

  }

  async function getArray(vimeoNode) {
    return getAST(vimeoNode).then(ast => {
      //console.log('getAST: ', ast)
      return ast
    })
  }

  const ListType = new GraphQLObjectType({
    name: `Vimeo`,
    fields: {
      name: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.name
        },
      },
      poster: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.poster
        },
      },
      id: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.id
        },
      },
      ratio: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.ratio
        },
      },
    },
  })


  return new Promise((resolve, reject) => {
    return resolve({
      videos: {
        type: new GraphQLList(ListType),
        resolve(vimeoNode) {
          return getArray(vimeoNode) || []
        },
      }
    })
  })
}