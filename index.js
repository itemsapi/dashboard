var express = require('express')
var ItemsAPI = require('itemsapi-node');
// PORT should go to the config because it is repeated many times
var PORT = process.env.PORT || 3000;
var path = require('path')
var _ = require('lodash')
var ui = require('./src/helpers/ui')
var bodyParser = require('body-parser');


var BACKEND_URL = process.env.BACKEND_URL;

var app
if (BACKEND_URL) {
  app = require('./itemsapi-remote-proxy-server')
} else {
  var itemsapiServer = require('./itemsapi-local-server')
  app = itemsapiServer.get('express');
}

app.use('/app', express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * run ItemsAPI client for further use
 */
app.all('*', function(req, res, next) {
  var client = new ItemsAPI('http://localhost:' + PORT + '/api/v1');
  req.client = client;
  next();
})

/**
 * main angular page
 */
app.get('/', function(req, res) {
  res.redirect('/app');
  //return res.sendFile(path.join(__dirname+ '/app/index.html'));
});

/**
 * add data out of the box with angular form
 */
app.post('/add-data', function(req, res) {
  if (req.body.data) {
    req.body.data = JSON.parse(req.body.data)
  }

  return req.client.createProject(req.body)
  .then(function(result) {
    res.json(result);
  })
});

/**
 * check metadata to generate table
 */
app.get('/metadata', function(req, res) {
  req.client.setName(req.query.name)
  return req.client.search({
  })
  .then(function(result) {
    var items = result.data.items
    var mapping = ui.generateTable(items)
    res.json(mapping);
  })
});

