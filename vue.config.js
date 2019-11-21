const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
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
      }
    }
  }
}