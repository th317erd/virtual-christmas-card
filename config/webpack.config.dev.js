var ENV                       = require('./environment'),
    baseConfig                = require('./webpack.config.base.js'),
    webpack                   = require('webpack'),
    CircularDependencyPlugin  = require('circular-dependency-plugin');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    `webpack-dev-server/client?${ENV.PROTOCOL}://${ENV.HOST}:${ENV.PORT}`
  ].concat(baseConfig.entry),
  mode: 'development',
  devServer: {
    hot: true,
    https: false,
    host: ENV.HOST,
    port: ENV.PORT,
    contentBase: ENV.APP_PUBLIC_PATH,
    disableHostCheck: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'global': 'window',
      'global.__DEV__': JSON.stringify(true),
      '__DEV__': JSON.stringify(true)
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /(node_modules)/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: ENV.APP_ROOT_PATH
    })
  ]
});
