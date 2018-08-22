const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'webpack/template.ssr.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ];
  return ({
    devServer: {
      contentBase: './dist',
    },
    devtool: 'source-map',
    entry: {
      main: path.resolve(__dirname, '../src'),
    },
    module: {
      rules: [
        {
          test: /\.(tsx?)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',

        },
        {
          test: /node_modules[\\\/].*\.(css|less)$/,
          use: [
            {
              loader: env.NODE_ENV === 'production' ?
                MiniCssExtractPlugin.loader :
                'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(css|less)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: env.NODE_ENV === 'production' ?
                MiniCssExtractPlugin.loader :
                'style-loader',
            },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 2,
                localIdentName: env.NODE_ENV === 'production'
                  ? '[hash:base64]'
                  : '[name]__[local]__[hash:base64:5]',
                modules: true,
                namedExport: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    output: {
      filename: env.NODE_ENV === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    plugins,
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      symlinks: false,
    },
  });
};
