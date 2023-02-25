const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mern-stack-social-app.onrender.com/',
      changeOrigin: true,
    })
  );
};