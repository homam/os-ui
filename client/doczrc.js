import { css } from 'docz-plugin-css'

module.exports = {
  typescript: true,
  plugins: [
    css({
      preprocessor: 'postcss',
      // cssmodules: true,
    }),
    css({
      preprocessor: 'less',
      cssmodules: true,
    })
  ]
  // modifyBundlerConfig: (config) => {
  //   config.resolve.extensions.push('.less')
  //   config.module.rules.push({
  //     test: /\.less$/,
  //     use: ["style-loader", "css-loader", 'postcss-loader', 'less-loader']
  //   })

  //   return config
  // }
}