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

export const urlLoader = {
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