const { merge } = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common.js")
const webpack = require("webpack")

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
    static: "./dist"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
