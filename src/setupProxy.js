const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/s',
        createProxyMiddleware({
            target: 'http://www.baidu.com',
            changeOrigin: true,
        })
    );
};