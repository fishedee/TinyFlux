var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
  	path:'build',
    filename: 'index.js'       
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
  	//new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
        title: 'tinyflux',
        template: './src/index.html',
        scriptFilename: 'index.js'
    })
  ]
};