const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = true

const typeScriptCSSLoader = {
  loader: 'typings-for-css-modules-loader',
  options: {
    modules: true,
    namedExport: true,
    sourceMap: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  }
}

const urlLoader = {
  test: /\.(pdf|jpg|jpeg|png|gif|svg|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 12000,
        name: '[path][name].[ext]'
      }
    },
  ]
}

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'hotReload'),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname),
    publicPath: '/',
  },
  context: resolve(__dirname, '../src'),
  resolve: {
    alias: {
      moment: 'moment/moment.js',
    },
    modules: [
      'node_modules',
      'bower_components'
    ],

    extensions: ['.tsx', '.ts', '.js', '.purs']
  },
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
        test: /\.(ts|tsx)$/,
        include: [resolve(__dirname, '../src')],
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src'), resolve(__dirname)],
        use: 'babel-loader',
      },
      {
        test: /\.styl$/,
        use: [
          'css-hot-loader',
          // MiniCssExtractPlugin.loader,
          'style-loader',
          // 'css-loader',
          typeScriptCSSLoader,
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          // ExtractTextPlugin.loader,
          'style-loader',
          typeScriptCSSLoader,
          // 'css-loader',
        ],
      },
      urlLoader
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
      title: 'Sigma',
      template: '../webpack/template.html',
    }),
    new webpack.DefinePlugin({
      'process.env.api_root': JSON.stringify(process.env.api_root || ''),
      'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
    })
  ],
  performance: { hints: false },
}
