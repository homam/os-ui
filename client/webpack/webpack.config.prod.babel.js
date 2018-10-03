const common = require('./webpack.config.common')
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")

const publicPath = ""

const page = process.env.page
const noCSSModules = "true" == process.env.noCSSModules 

module.exports = {
  mode: 'production',
  entry: {
    main: !!page && page != "default"  
      ? resolve(__dirname, `../src/landing-pages/${page}/index`) 
      : resolve(__dirname, '../src'),
    // main: resolve(__dirname, '../src'),
    // vendor: [
    //   'react-redux',
    //   'react-router-dom',
    //   'redux',
    //   'redux-thunk',
    //   'styled-components',
    // ],
  },
  externals: common.externals,
  output: {
    filename: `static/${page}/js/[name].[chunkhash].js`,
    path: resolve(__dirname, '../dist'),
    publicPath: publicPath + '/',
  },
  resolve: common.resolve,
  devtool: 'source-map',
  module: {
    rules: [
      common.modules.purs,
      common.modules.ts,
      {
        test: /\.styl$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          // {
          // loader: require.resolve('css-loader'),
          // options: {
          //   modules: true,
          //   localIdentName: '[path][name]__[local]--[hash:base64:5]'
          // }
          // },
          noCSSModules ? 'css-loader' : common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.stylus,
        ].filter(x => !!x),
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          noCSSModules ? 'css-loader' : common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.less,
        ].filter(x => !!x),
      },
      common.modules.url,
    ],
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /styl\.d\.ts$/,
      /css\.d\.ts$/
    ]),
    common.plugins.define,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `static/${page}/css/[name].[contenthash:8].css`,
      chunkFilename: `static/${page}/css/[name].[contenthash:8].chunk.css`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'webpack/template.ssr.html',
      filename: `static/${page}/html/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer",
      // inline: [/js/ig]
    }),
    new InterpolateHtmlPlugin({
      'PUBLIC_URL': publicPath
    })
  ],
}
