'use strict';
var _ = require('lodash');
var detector = require('type-detection')

exports.generateTable = function(items) {

  var rows = _.map(items, function(item) {
    return _.chain(item)
    .omit(['score'])
    .mapValues(function(value, key) {
      //console.log(key);

      if (key === 'id') {
        return {
          value: value,
          type: 'id'
        }
      }

      return {
        value: value,
        type: detector.detectFieldType(value)
      }
    })
    .pickBy(function(val) {
      //return ['id', 'string', 'image', 'array', 'float', 'integer', 'text', 'url'].indexOf(val.type) !== -1
      return ['string', 'image', 'array', 'float', 'integer', 'text', 'url'].indexOf(val.type) !== -1
    })
    .value()

    return _.mapValues(item, function(value, key) {
      return {
        value: value,
        type: detector.detectFieldType(value)
      }
    })
  })

  var keys = _.keys(_.head(rows))

  return {
    keys: keys,
    rows: rows
  }
}
