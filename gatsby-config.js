const loadYaml = require('./loadYaml')
const siteMetadata = loadYaml('./data/site-metadata.yml')
const { trackingId } = siteMetadata

module.exports = {
  siteMetadata: {
    title: siteMetadata.title,
    trackingId: siteMetadata.trackingId,
    numEvents: siteMetadata.numEvents,
    meta: {
      description: siteMetadata.meta.description,
      keywords: siteMetadata.meta.keywords
    },
    agency: loadYaml('./data/agency.yml'),
  },
  plugins: [
    `@jacobmischka/gatsby-plugin-react-svg`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img/`,
        name: 'images'
      }
    },
    'vimeo-thumbnail',
    {
      resolve: `instagram-scraper`,
      options: {
        usernames: [
          `allanface`,
          `hairbyadir`,
          `mararoszak`,
          `marktownsend1`,
          `jennychohair`,
          `jilliandempsey`,
          `karayoshimotobua`,
          `mollyrstern`,
          `elkin`,
          `deborahlippmann`,
          `fionastiles`
        ]
      }
    },
    'custom-plugin-sharp',
    'custom-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    }
  ],
};
