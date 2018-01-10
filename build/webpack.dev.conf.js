var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var path = require('path')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
baseWebpackConfig.entry =  {
  app: ['babel-polyfill','./src/devmain.js']
  // jquery: 'node_modules/jquery/dist/jquery.min.js',
//  login: ['./src/login/login.js']
}
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      axios:"axios",
      Mock:"mockjs"
      }),


    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'devlogin.html',
      template: 'devlogin.html',
      inject: false
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'login.html',
    //   template: './src/login/login.html',
    //   inject:true,
    //   chunks: ['login']
    // }),
  //   new webpack.ProvidePlugin({
  //   axios:"axios"
  // }),

    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        //to: config.build.assetsSubDirectory,
        to: 'static',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../legacy'),
        to: '',
        ignore: ['.*']
      }
    ])

  ]
})
