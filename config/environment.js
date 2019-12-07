var Path = require('path');

const APP_ROOT_PATH = Path.resolve(__dirname, '..');

module.exports = {
  PORT: 8090,
  HOST: 'christmas.xoumz.com',
  PROTOCOL: 'http',
  APP_ROOT_PATH,
  APP_PUBLIC_PATH: Path.resolve(APP_ROOT_PATH, 'public'),
  APP_SOURCE_PATH: Path.resolve(APP_ROOT_PATH, 'app')
};
