const common = require('./webpack.config.common')
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = true

const page = process.env.page
const noReact = "true" == process.env.noReact 
const noCSSModules = "true" == process.env.noCSSModules 


module.exports = {
  mode: 'development',
  entry: (noReact ? [] : ['react-hot-loader/patch']).concat([
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    // resolve(__dirname, 'hotReload'),
    !!page && page != "default"  
      ? resolve(__dirname, `../src/landing-pages/${page}/hotReload`) 
      : resolve(__dirname, 'hotReload'),
  ]),
  externals: common.externals,
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname),
    publicPath: '/',
  },
  context: resolve(__dirname, '../src'),
  resolve: common.resolve,
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '127.0.0.1',
    contentBase: resolve(__dirname, '../assets'),
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3081/', // 'https://api.ipify.org/',
        changeOrigin: true,
        ws: true,
      }
    },
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      common.modules.purs,
      common.modules.ts,
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src'), resolve(__dirname)],
        use: 'babel-loader',
      },
      {
        test: /\.styl$/,
        use: [
          'css-hot-loader',
          'style-loader',
          noCSSModules ? 'css-loader' : common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.stylus,
        ].filter(x => !!x)
      },
      {
        test: /\.(css|less)$/,
        use: [
          'css-hot-loader',
          'style-loader',
          noCSSModules ? 'css-loader' : common.loaders["typings-for-css"],
          common.loaders.postcss,
          common.loaders.less,
        ].filter(x => !!x),
      },
      common.modules.url,
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new MiniCssExtractPlugin('style.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: process.env.page,
      template: "true" == process.env.html ? `../src/landing-pages/${page}/template.html` : '../webpack/template.html',
    }),
    new webpack.DefinePlugin({
      'process.env.api_root': JSON.stringify(process.env.api_root || ''),
      'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
    })
  ],
  performance: { hints: false },
}
