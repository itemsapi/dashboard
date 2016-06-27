var express = require('express');
var Promise = require('bluebird');

var itemsapi = require('itemsapi');

var ELASTICSEARCH_URL = '127.0.0.1:9200';
// heroku elasticsearch addon
if (process.env.SEARCHBOX_URL) {
  ELASTICSEARCH_URL = process.env.SEARCHBOX_URL;
}

var PORT = process.env.PORT;
console.log(PORT);
console.log(ELASTICSEARCH_URL);
//console.log(__dirname);



itemsapi.init({
  server: {
    port: PORT,
    host: "0.0.0.0",
    logger: false
  },
  elasticsearch: {
    host: ELASTICSEARCH_URL
  },
  collections: {
    db: 'json',
    filename:  'collections.json'
  }
})

var app = itemsapi.get('express');
var path = require('path')
var _ = require('lodash')
var ui = require('./src/helpers/ui')

app.use('/app', express.static('app'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var ItemsAPI = require('itemsapi-node');

app.all('*', function(req, res, next) {
  var client = new ItemsAPI('http://localhost:' + PORT + '/api/v1');
  req.client = client;
  next();
})

app.get('/', function(req, res) {
  res.redirect('/app');
  //return res.sendFile(path.join(__dirname+ '/app/index.html'));
});

app.post('/add-data', function(req, res) {
  if (req.body.data) {
    req.body.data = JSON.parse(req.body.data)
  }

  //console.log(req.body);
  //console.log(_.keys(req.body.data))
  return req.client.createProject(req.body)
  .then(function(result) {
    res.json(result);
  })
});

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


itemsapi.start(function serverStart(serverInstance) {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  itemsapi.get('logger').info('ItemsAPI started on http://%s:%s', host, port)
});
