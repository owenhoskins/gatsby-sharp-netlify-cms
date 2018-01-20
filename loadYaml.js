const yaml = require('js-yaml')
const fs = require('fs')

module.exports = (fname) =>
  yaml.safeLoad(fs.readFileSync(fname, 'utf8'))
