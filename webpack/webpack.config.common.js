const path = require('path')
const webpack = require('webpack')

export const urlModule = {
  test: /\.(pdf|jpg|jpeg|png|gif|svg|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 12000
      }
    },
  ]
}

export const puresModule = {
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
}

export const tsModule = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [path.resolve(__dirname, '../src')],
  exclude: /node_modules/,
  loader: 'ts-loader'
}

export const typeScriptCSSLoader = {
  loader: 'typings-for-css-modules-loader',
  options: {
    modules: true,
    namedExport: true,
    sourceMap: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    importLoaders: 3,
  }
}

export const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
}

export const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
  },
}

export const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: true,
  },
}

export const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

export const resolve = {
  alias: {
    moment: 'moment/moment.js',
  },
  modules: [
    'node_modules',
    'bower_components'
  ],

  extensions: ['.tsx', '.ts', '.js', '.purs']
}

export const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
  // 'process.env.api_root': JSON.stringify(process.env.api_root || ''),
  // 'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
})

export const modules = {
  'purs': puresModule,
  'ts': tsModule,
  'url': urlModule,
}

export const loaders = {
  'typings-for-css': typeScriptCSSLoader,
  'postcss': postCSSLoader,
  'less': lessLoader,
  'stylus': stylusLoader,
}

export const plugins = {
  define: definePlugin
}