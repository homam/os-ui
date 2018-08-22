const common = require('./webpack.config.common')
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');

const publicPath = ""

console.log('process.env.page', process.env.page)

module.exports = {
  mode: 'production',
  entry: {
    main: !!process.env.page && process.env.page != "default"  ?  resolve(__dirname, `../src/landing-pages/${process.env.page}`) : resolve(__dirname, '../src'),
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
    filename: '[name].[chunkhash].js',
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
          common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.stylus,
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.less,
        ],
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
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'webpack/template.ssr.html',
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
    new InterpolateHtmlPlugin({
      'PUBLIC_URL': publicPath
    })
  ],
}
