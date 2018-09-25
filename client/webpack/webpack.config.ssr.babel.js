const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');
const { resolve } = require('path')
const webpack = require('webpack')
const config = require("./webpack.config.prod.babel");

const page  = process.env.page

config.entry = resolve(__dirname, '../src/index.ssr.ts') // "../src/index.ssr.ts";
config.entry = !!page && page != "default" 
 ? resolve(__dirname, `../src/landing-pages/${page}/index.ssr.ts`) 
 : resolve(__dirname, '../src/index.ssr.ts')

config.output.filename = `static/${page}/ssr/[name].js`;
config.output.libraryTarget = "commonjs2";
delete config.output.chunkFilename;

config.target = "node";
config.externals = /^[a-z\-0-9]+$/;
delete config.devtool;

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: `static/${page}/css/[name].[contenthash:8].css`,
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),
  // new HtmlWebpackPlugin({
  //   inject: !true,
  //   template: 'webpack/template.ssr.html',
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true,
  //     removeRedundantAttributes: true,
  //     useShortDoctype: true,
  //     removeEmptyAttributes: true,
  //     removeStyleLinkTypeAttributes: true,
  //     keepClosingSlash: true,
  //     minifyJS: true,
  //     minifyCSS: true,
  //     minifyURLs: true,
  //   },
  // }),
  // new InterpolateHtmlPlugin({
  //   'PUBLIC_URL': ''
  // })
],

module.exports = config;
