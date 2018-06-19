/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源的插件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件


// const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //js代码压缩插件
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//css压缩插件
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
//css按需加载
const PurifyCSSPlugin = require("purifycss-webpack");

const CircularDependencyPlugin = require("circular-dependency-plugin");
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "src/app.js")
  ],

  output: {
    filename: "[name].[chunkhash:5].js",
    chunkFilename: "[name].[chunkhash:5].chunk.js",
    publicPath: "/"
  },
  module: {
    rules: [{
        //处理自己的css文件
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
      },
      {
        //编译处于node_modules中的css文件
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "post",
        loaders: ["es3ify-loader"],
        include: [
          path.resolve(process.cwd(), "./src"),
          // path.resolve(process.cwd(), "./node_modules/axios"),
          path.resolve(process.cwd(), "./node_modules/babel-polyfill")
        ]
      }

    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial", //有三个值可能"initial"，"async"和"all"。配置时，优化只会选择初始块，按需块或所有块。
          name: "common", //名字
          minChunks: 2, //分割前的代码最大块数
          maxInitialRequests: 5, // entry(入口)的并行请求数
          minSize: 30000 // 最小值
        }
      }
    },
    minimizer: [
      // 多入口使用
      new WebpackParallelUglifyPlugin({
        uglifyJS: {
          output: {
            beautify: false, //不需要格式化
            comments: false //不保留注释
          },
          compress: {
            properties: false, //属性
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器（生产环境就没有log了）
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
          },
          ie8: true // 兼容ie8的精髓，简单且强大
        }
      })
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // 页面压缩相关配置
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(process.cwd(), "src/lib"), //lib对象文件夹
      to: path.resolve(process.cwd(), "build/lib"), //lib目标文件夹
      ignore: [".*"]
    }]),
    new PurifyCSSPlugin({
      paths: glob.sync(path.resolve(process.cwd(), "src/*.html"))
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(["build"], {
      root: path.resolve(process.cwd()),
      verbose: true,
      dry: false
    })
  ],
  devtool: false,
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  }
});