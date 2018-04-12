const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')

const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const bundleConfig = require('./dll/bundle-config.json')
// WebpackManifestPlugin

const dllManifestDir = path.resolve(__dirname, './manifest/prod')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
    chunkFilename: 'js/chunks/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      allowExternal: true,
      exclude: ['.git']
    }),
    new webpack.DllReferencePlugin({
      context: dllManifestDir,
      manifest: require(path.join(dllManifestDir, 'vendor-manifest.json'))
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].min.css',
      disable: false,
      allChunks: true
    }),
    new ProgressBarPlugin(),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {},
      vendorJsName: bundleConfig.vendor.js, // 加载dll文件
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './dll/prod'),
        to: path.resolve(__dirname, '../dist/js/dll'),
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
