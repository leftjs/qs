var path = require('path');
var cooking = require('cooking');
var build = require('./build');
var isProd = process.env.NODE_ENV === 'production';

cooking.set({
  entry: build.entries(),
  dist: './dist',
  template: build.templates(),
  devServer: {
    port: 8080,
    publicPath: '/',
    proxy: {
      '/api/**': {
        target: 'http://localhost:3003/',
        changeOrigin: true,
      }
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/home/, to: '/home.html'}
      ]
    }
  },
  clean: true,
  hash: true,
  sourceMap: true,
  chunk: true,
  postcss: [],
  publicPath: '/dist/',
  extractCSS: isProd ? 'static/[name].[contenthash:7].css' : true,
  alias: {
    'src': path.join(__dirname, 'src'),
    'vue$': 'vue/dist/vue.js'
  },
  extends: ['vue2', 'less', 'autoprefixer'],
  externals: build.externals()
});

isProd && cooking.add('output.filename', 'static/[name].[hash:7].js');

module.exports = cooking.resolve();
