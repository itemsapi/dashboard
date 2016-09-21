var express = require('express');
var app = express();

var proxy = require('express-http-proxy');
// should come from one config
var PORT = process.env.PORT || 3000;

// i.e. http://cloud.itemsapi.com/api/v1
var BACKEND_URL = process.env.BACKEND_URL;

app.listen(PORT, function () {
  console.log('Proxy server has started on port: ' + PORT);
});

// proxy server for external backend
app.use('/api/v1', proxy(BACKEND_URL, {
  forwardPath: function(req, res) {
    return req.originalUrl
  }
}));

module.exports = app
