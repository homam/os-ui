const path = require('path')
const webpack = require('webpack')

const page = process.env.page
const noReact = "true" == process.env.noReact 

const urlModule = {
  test: /\.(pdf|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 12000,
        name: `static/${page}/files/[hash].[ext]`,
      }
    },
  ]
}

const puresModule = {
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

const tsModule = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [path.resolve(__dirname, '../src')],
  exclude: /node_modules/,
  // loader: 'ts-loader',
  loader: 'babel-loader'
}

const mkTypeScriptCSSLoader = camelCase => ({
  loader: 'typings-for-css-modules-loader',
  options: {
    modules: true,
    namedExport: true,
    sourceMap: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase,
    importLoaders: 3,
  }
})

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
  },
}

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: true,
  },
}

const externals = noReact ? {} : {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const resolve = {
  alias: {
    moment: 'moment/moment.js',
  },
  modules: [
    'node_modules',
    'bower_components'
  ],
  symlinks: false,

  extensions: ['.tsx', '.ts', '.js', '.purs']
}

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.country': JSON.stringify(process.env.country || ''),
  // 'process.env.api_root': JSON.stringify(process.env.api_root || ''),
  // 'process.env.finance_email': JSON.stringify(process.env.finance_email || '')
})

const modules = {
  'purs': puresModule,
  'ts': tsModule,
  'url': urlModule,
}

const loaders = {
  'typings-for-css': mkTypeScriptCSSLoader(false),
  'typings-for-css-camelCase': mkTypeScriptCSSLoader(true),
  'postcss': postCSSLoader,
  'less': lessLoader,
  'stylus': stylusLoader,
}

const plugins = {
  define: definePlugin
}

module.exports = {
  modules,
  plugins,
  loaders,
  resolve,
  externals
}