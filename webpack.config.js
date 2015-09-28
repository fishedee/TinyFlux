var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
  	path:'build',
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
  	//new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
        title: 'tinyflux',
        template: './src/index.html',
        scriptFilename: 'bundle.js'
    })
  ]
};