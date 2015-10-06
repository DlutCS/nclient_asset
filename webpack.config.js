'use strict';

var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var srcBase = path.resolve( __dirname, 'src/' ),
    buildBase = path.resolve( __dirname, 'build/' );


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    srcBase + '/assets/js/index.es6'
    ],
    plugins: [
      new ExtractTextPlugin("[name].css")
    ],
    module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.es6$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!postcss-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 4 versions']  })  ],
  output: {
      path: buildBase,
      filename: 'bundle.js',
  },
};
