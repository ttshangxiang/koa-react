const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {  
      src: path.resolve(__dirname, '../src')  
    }
  },

  module: {
    rules: [
      {
        test: /\.(?:png|jpe?g|gif|ico)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(?:woff2?|eot|ttf|otf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}

module.exports = webpackConfig
