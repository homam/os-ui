const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require('path')


const config = require("./webpack.config.prod");

config.entry = resolve(__dirname, '../src/index.ssr.ts') // "../src/index.ssr.ts";

config.output.filename = "static/ssr/[name].js";
config.output.libraryTarget = "commonjs2";
delete config.output.chunkFilename;

config.target = "node";
config.externals = /^[a-z\-0-9]+$/;
delete config.devtool;

// config.plugins = config.plugins.filter(
//   plugin =>
//     !(
//       plugin instanceof HtmlWebpackPlugin
//     )
// );

module.exports = config;
