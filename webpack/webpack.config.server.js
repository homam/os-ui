const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals');


module.exports = {
  target: 'node',
  externals: /^[a-z\-0-9]+$/, //[nodeExternals()],
  mode: 'production',
  entry: resolve(__dirname, '../src/server/index.tsx'),
    // vendor: [
    //   'react-redux',
    //   'react-router-dom',
    //   'redux',
    //   'redux-thunk',
    //   'styled-components',
    // ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  output: {
    filename: 'server.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      moment: 'moment/moment.js',
    },
    extensions: [ '.tsx', '.ts', '.js', '.purs' ]
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
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve(__dirname, '../src')],
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader'
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // 'process.env.api_root': JSON.stringify(process.env.api_root || ''),
      // 'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'OS UI',
      template: 'webpack/template.html'
    }),
  ],
}
