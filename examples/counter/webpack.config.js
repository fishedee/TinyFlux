var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path:'dist',
    filename: 'bundle.js'       
  },
  module:{
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  resolve: {
    extensions: ['','.js']
  },
  plugins:[
    new HtmlWebpackPlugin({
        title: 'tinyflux',
        template: 'index.html',
        scriptFilename: 'bundle.js'
    })
  ]
};