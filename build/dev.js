/*eslint-disable */
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const devMiddleware = require('./devMiddleware')
const hotMiddleware = require('./hotMiddleware')

module.exports = app => {
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))
}