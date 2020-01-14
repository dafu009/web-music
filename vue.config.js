const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/",
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'videojs': 'video.js'
      })
    ]
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8888",
        changeOrigin: true, //是否跨域
        ws: true, //是否启用websockets
        pathRewrite: {
          "^api": "/api"
        }
      },
      "/music": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true, //是否跨域
        ws: true, //是否启用websockets
        pathRewrite: {
          "^/music": ""
        }
      }
    }
  }
}