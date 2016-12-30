var ItemsAPI = require('itemsapi-node');
var _ = require('lodash');
var Promise = require('bluebird');

exports.list = function(data) {
  var client = new ItemsAPI(data.api)

  return client.getCollections()
  .then(function(res) {
    return res.data.items
  })
}

exports.reindex = function(data) {
  var client = new ItemsAPI(data.api, data.collection)

  return client.collectionReindex(undefined, data)
  .then(function(res) {
    return client.getCollection()
  })
}

exports.get = function(data) {
  var client = new ItemsAPI(data.api, data.collection)
  return client.getCollection()
}
