var App = require('./app');

(function() {
  var app = global.app = new App({
    flakeCount: 300
  });
})();
