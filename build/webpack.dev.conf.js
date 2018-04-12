const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const dllManifestDir = path.resolve(__dirname, './manifest/dev')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?noInfo=false&reload=true',
      'src/index.js'
    ]
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/chunks/[id].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env'],
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: dllManifestDir,
      manifest: require(path.join(dllManifestDir, 'vendor-manifest.json'))
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      vendorJsName: 'vendor.dll.js', // 加载dll文件
      inject: true
    }),
    new ProgressBarPlugin(),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './dll/dev'),
        to: path.resolve(__dirname, '../dist/js/dll'),
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig