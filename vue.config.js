const env = process.env.NODE_ENV;

module.exports = {
  publicPath: env === 'test' || env === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
