const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');

const typeScriptCSSLoader = {
  loader: 'typings-for-css-modules-loader',
  options: {
    modules: true,
    namedExport: true,
    sourceMap: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  }
}

module.exports = {
  mode: 'production',
  entry: {
    main: resolve(__dirname, '../src'),
    // vendor: [
    //   'react-redux',
    //   'react-router-dom',
    //   'redux',
    //   'redux-thunk',
    //   'styled-components',
    // ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      moment: 'moment/moment.js',
    },
    extensions: [ '.tsx', '.ts', '.js', '.purs' ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.purs$/,
        exclude: /node_modules/,
        loader: 'purs-loader',
        options: {
          src: [
            'bower_components/purescript-*/src/**/*.purs',
            'src/**/*.purs'
          ],
          pscIde: true
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve(__dirname, '../src')],
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
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
          typeScriptCSSLoader,
          {
            loader: 'stylus-loader'
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, typeScriptCSSLoader]
      },
    ],
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /styl\.d\.ts$/,
      /css\.d\.ts$/
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // 'process.env.api_root': JSON.stringify(process.env.api_root || ''),
      // 'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
    }),
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
      'PUBLIC_URL': ''
    })
  ],
}
