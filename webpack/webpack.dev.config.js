/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "src/app.js")
  ],

  // 在development环境不要用到的hash
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/"
  },
  module: {
    rules: [{
        //处理自己的css文件
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: true || {
                /*自己的配置*/
              }
            }
          }
        ]
      },
      {
        //处理自己的scss/sass文件
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }

    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true, //js包自动注入html
      template: "src/index.html"
    }),
    //循环引用相关
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false //如果有则显示警告即可
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.NamedModulesPlugin() //热加载相关插件
  ],
  devtool: "inline-source-map",
  performance: {
    hints: false
  },
  devServer: {
    hot: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ['jsnext:main', 'browser', 'main']
  }
});