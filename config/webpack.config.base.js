const ENV = require('./environment'),
      Path = require('path');

module.exports = {
  stats: {
    warnings: false
  },
  performance: {
    hints: false
  },
  entry: Path.resolve(ENV.APP_SOURCE_PATH, 'index.js'),
  output: {
    filename: 'main.js',
    publicPath: 'javascript',
    path: Path.resolve(__dirname, 'public/javascript'),
  },
  target: 'web',
  resolve: {
    extensions: [ '.js', '.json' ],
    alias: Object.assign({
    }),
    modules: [ 'node_modules' ]
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    FS: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
