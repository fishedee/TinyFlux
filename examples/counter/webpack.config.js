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

// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var tinyfluxSrc = __dirname+'/../../src/index.js';
var immutableSrc = __dirname+'/node_modules/immutable/dist/immutable.js';
var reactSrc = __dirname+'/node_modules/react/react.js';
var fs = require('fs');
if (fs.existsSync(tinyfluxSrc) ) {
  // Resolve Redux to source
  module.exports.resolve = { alias: { 
    'tinyflux': tinyfluxSrc,
    'react':reactSrc,
    'immutable':immutableSrc,
  } };
  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: tinyfluxSrc
  });
}