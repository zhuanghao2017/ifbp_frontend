var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill','./src/main.js']
    // jquery: 'node_modules/jquery/dist/jquery.min.js',
  //  login: ['./src/login/login.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
       // 'jquery': path.join(__dirname, 'src/login/cas/js/jquery.min.js'),
       'jquery.cookie': path.join(__dirname, 'src/login/cas/js/jquery.cookie.js'),
       'cas': path.join(__dirname, 'src/login/cas/js/cas.js'),
       'u': path.join(__dirname, 'src/login/cas/js/u.js'),

    }
  },
  externals:[
    {"src/login/cas/js/jquery.min.js": '$'},
    {"src/login/cas/js/jquery.cookie.js": '$.cookie'},
    {"src/login/cas/js/cas.js'": 'cas'},
    {"src/login/cas/js/u.js'": 'u'},
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts')],
        exclude: /node_modules(?![\\/]vue-echarts[\\/])/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 3000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
      ,
      {
          test: /\.css$/,
           include: [path.resolve(__dirname, "src/login")],
          //loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
          //loader:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
           loader: "style!css?sourceMap"
      }
    ]
  }
}
