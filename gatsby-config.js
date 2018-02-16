module.exports = {
  siteMetadata: {
    title: 'Gallery Pages',
  },
  plugins: [
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
          `karayoshimotobua`
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-offline`
  ],
};
