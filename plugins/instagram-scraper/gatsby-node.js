const Promise = require("bluebird")
const axios = require(`axios`)
const crypto = require(`crypto`)
const { get } = require(`lodash`)

// Convert timestamp to ISO 8601.
const toISO8601 = timestamp => new Date(timestamp * 1000).toJSON()

exports.sourceNodes = ({ boundActionCreators }, { usernames }) => {
    const { createNode } = boundActionCreators

    return Promise.all(usernames.map(username => {

        return axios.get(`https://www.instagram.com/${username}/?__a=1`).then(res => {

            res.data.user.media.nodes.map(item => {

              const datum = {
                id: get(item, `id`),
                code: get(item, `code`),
                time: toISO8601(get(item, `date`)),
                type: get(item, `__typename`),
                text: get(item, `caption`),
                media: get(item, `display_src`),
                image: `images/${item.code}.jpg`,
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

              //console.log(`instagram-scraper node: `, node)

              createNode(node)
              return true;
            })
        })
    })).catch(error => {
        console.log(error);
    });
}