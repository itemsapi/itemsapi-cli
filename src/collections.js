var ItemsAPI = require('itemsapi-node');
var _ = require('lodash');
var Promise = require('bluebird');

exports.list = function(data) {
  var client = new ItemsAPI(data.api)

  return client.getCollections()
  .then(function(res) {
    return res.data.items
  })
  /*return new Promise(function(resolve, reject) {
    return resolve('Collections list')
  })*/
}
