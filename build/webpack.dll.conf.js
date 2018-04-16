const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const _PROP = process.env.NODE_ENV === 'production'
const dllDir = path.join(__dirname, `./dll/${_PROP ? 'prod' : 'dev'}`)
const manifestDir = path.join(__dirname, `./manifest/${_PROP ? 'prod' : 'dev'}`)

const webpackConfig = {
  mode: 'development',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'es6-promise',
      'isomorphic-fetch',
      'react-hot-loader',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'redux-api-middleware',
      'redux-diff-logger',
    ],
  },
  output: {
    path: dllDir,
    filename: _PROP ? '[name].dll.[chunkhash:8].js' : '[name].dll.js',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ProgressBarPlugin(),
    new CleanWebpackPlugin([dllDir, manifestDir], {
      allowExternal: true
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: path.resolve(__dirname, 'dll')
    }),
    new webpack.DllPlugin({
      path: `${manifestDir}/[name]-manifest.json`,
      name: '[name]',
      context: manifestDir
    })
  ]
}

if (_PROP) {
  webpackConfig.plugins.splice(1, 0, new webpack.HashedModuleIdsPlugin())
  webpackConfig.optimization = {
    minimize: true
  }
  webpackConfig.mode = 'production'
}

module.exports = webpackConfig