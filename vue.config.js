let proxyObj = {}

//需要重新转发websocket所以需要 ['/']
proxyObj['/'] = {
    // websocket
    ws: false,
    //转发的地址
    target: 'http://127.0.0.1:8081',
    // 发送的请求头中的 host 会被设置成 target：http://127.0.0.1:8081，如果跨域就需要开启这个配置
    changeOrigin: true,
    // 重写请求地址
    pathRewrite: {'^/': '/'}
}


// websocket的代理
proxyObj['/ws'] = {
    ws: true,
    target: 'ws://localhost:8081'
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        //node.js把请求转发到服务器的接口8081，前端实际还是访问的8080端口
        proxy: proxyObj
    }
}