const pkg = require('../../package.json')
export default {
  name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  description: pkg.description,
  copyright: pkg.copyright,
  repository: pkg.repository,
}
