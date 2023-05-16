const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭语法检测
  lintOnSave: false,
  transpileDependencies: true,

  //开启代理服务器，代理服务器本身的端口号与本机一致，所以在proxy里写需要请求的服务器端口号
  /* 方式1，不完美
  devServer:{
    proxy:'http://localhost:5000'
  }
  */
  devServer: {

    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/atguigu': {  //当请求url最前端有/atguigu时代理服务器才转发请求给目标服务器
        target: 'http://localhost:5000',
        pathRewrite: { '^/atguigu': '' }, //路径重写，正则表达式，将所有匹配为/atguigu的路径都替换为''
        ws: true,//用于支持websocket
        changeOrigin: true //用于控制请求头中的host值，即代理服务器说不说谎，目标服务器询问代理服务器端口，true说我是5000，false如实说我是8080
      },
      '/demo': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/demo': '' },
      }
    }
  }
})