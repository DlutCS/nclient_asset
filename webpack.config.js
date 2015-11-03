'use strict';

var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

var srcBase = path.resolve(__dirname, 'src/' ),
    buildBase = path.resolve( __dirname, 'build/' );


module.exports = {
  entry: {
      'hot': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080'],
      'index': srcBase + '/assets/js/index.es6',
      'news': srcBase + '/assets/js/news.es6',
      'login': srcBase + '/assets/js/login.es6'
    },
    plugins: [
      new ExtractTextPlugin("[name].css"),
      new CommonsChunkPlugin('common', 'common.js', ['index', 'news', 'login'])
      ,
      new UglifyJsPlugin({
        mangle: {
          except: ['$super', '$', 'module', 'exports', 'require', 'angular'],
        },
        exclude: /vendor/i,
        compress: {
          warnings: false
        }
      })
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
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!postcss-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
    },
    {
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=16384'
    }]
  },
  output: {
      path: buildBase,
      filename: '[name].bundle.js',
      publicPath: "http://localhost:8080/assets/"
  },
  debug: true
};
