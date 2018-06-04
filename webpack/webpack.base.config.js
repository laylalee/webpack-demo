const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: path.join(process.cwd(), "src/app.js"),
  output: {
    path: path.resolve(process.cwd(), "build")
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
      //babel转换
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }]
  },
  plugins: [
    // 环境变量定义插件
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // 编译进度条
    new ProgressBarPlugin({
      format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
    })

  ],
  devtool: "inline-source-map", //是否生成与如何生成source-map

};