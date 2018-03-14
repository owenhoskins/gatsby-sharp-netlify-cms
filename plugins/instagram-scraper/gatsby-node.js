const Promise = require("bluebird")
const axios = require(`axios`)
const crypto = require(`crypto`)
const { get } = require(`lodash`)

// Convert timestamp to ISO 8601.
const toISO8601 = timestamp => new Date(timestamp * 1000).toJSON()

// Convert followers to k format if a thousand or more
// https://stackoverflow.com/a/9461657/497344
const kFormatter = num => num > 999 ? (num/1000).toFixed(0) + 'k' : num


exports.sourceNodes = ({ boundActionCreators }, { usernames }) => {
    const { createNode } = boundActionCreators

    return Promise.all(usernames.map(username => {

        return axios.get(`https://www.instagram.com/${username}/?__a=1`).then((res, err) => {

            if (err) {
              console.log('Instagram get error: ', username, err)
            } else {
              /*
                  graphql: {
                    user: {
                      edge_followed_by: {
                        count: 206938
                      },
                      edge_owner_to_timeline_media: {
                        edges: [
                          {
                            node: {
                              id: '',
                              display_url: '',
                              is_video: false,
                              dimensions: {
                                width: 1080,
                                height: 1080
                              },
                            }
                          }
                        ]
                      }
                    }
                  }
*/

              res.data.graphql.user.edge_owner_to_timeline_media.edges.map(item => {

                const datum = {
                  username: username,
                  id: get(item.node, `id`), // string
                  media: get(item.node, `display_url`), // string
                  is_video: get(item.node, `is_video`), // boolean
                  dimensions: get(item.node, `dimensions`), // height, width
                  media_preview: get(item.node, `media_preview`), // base64
                  followers: kFormatter(res.data.graphql.user.edge_followed_by.count)
                }

                const digest = crypto
                    .createHash(`md5`)
                    .digest(`hex`)
                    //.update(JSON.stringify(datum))

                const node = Object.assign(
                    datum,
                    {
                      parent: `__SOURCE__`,
                      children: [],
                      internal: {
                        type: `InstagramPhoto`,
                        contentDigest: digest,
                        mediaType: `application/json`
                      },
                    }
                )

                createNode(node)
                return true;
              })
            }

        })
    }))//.catch(error => { console.log('Instagram sourceNodes catch error:', error);});
}