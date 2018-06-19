const path = require("path");
const ip = require("ip");
const chalk = require("chalk");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const proxy = require('http-proxy-middleware');


const port = 3001;
const host = "localhost";
//判断
let webpackConfig = process.env.NODE_ENV === "development" ? require("../webpack/webpack.dev.config") : webpackConfig = require('../webpack/webpack.prod.config');

let app = express();

const comliper = webpack(webpackConfig);
const devMiddle = webpackDevMiddleware(comliper);

app.use(devMiddle);
app.use(webpackHotMiddleware(comliper));

//代理请求转发
const apiProxy = proxy("/", {
  target: "https://www.easy-mock.com/",
  changeOrigin: true
}); //将请求转发
app.use("/*", apiProxy);



app.listen(port, host, err => {
  console.log(`

Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}

${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
});