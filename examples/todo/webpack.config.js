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
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css?$/,loaders: ['style', 'raw'],include: __dirname}
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

// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var tinyfluxSrc = __dirname+'/../../src/tinyflux.js';
var fs = require('fs');
if (fs.existsSync(tinyfluxSrc) ) {
  // Resolve Redux to source
  module.exports.resolve = { alias: { 'tinyflux': tinyfluxSrc } };
  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: tinyfluxSrc
  });
}