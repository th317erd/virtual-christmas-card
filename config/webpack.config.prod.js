const ENV           = require('./environment'),
      baseConfig    = require('./webpack.config.base.js'),
      webpack       = require('webpack'),
      TerserPlugin  = require('terser-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'global': 'window',
      'global.__DEV__': JSON.stringify(false),
      '__DEV__': JSON.stringify(false)
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          keep_fnames: true,
          mangle: false
        },
        cache: false,
        parallel: true,
        sourceMap: false
      })
    ]
  }
});
