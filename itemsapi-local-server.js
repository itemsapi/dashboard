var express = require('express');
var Promise = require('bluebird');
var itemsapi = require('itemsapi');

var ELASTICSEARCH_URL = '127.0.0.1:9200';
// heroku elasticsearch addon
if (process.env.SEARCHBOX_URL || process.env.ELASTICSEARCH_URL) {
  ELASTICSEARCH_URL = process.env.SEARCHBOX_URL || process.env.ELASTICSEARCH_URL;
}

var PORT = process.env.PORT || 3000;

itemsapi.init({
  server: {
    port: PORT,
    host: "0.0.0.0",
    logging_level: 'info',
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

itemsapi.start(function serverStart(serverInstance) {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  itemsapi.get('logger').info('ItemsAPI started on http://%s:%s', host, port)
});

module.exports = itemsapi
