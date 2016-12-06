var ItemsAPI = require('itemsapi-node');
var _ = require('lodash');
var Promise = require('bluebird');
var JSONStream = require('JSONStream')
var fs = Promise.promisifyAll(require('fs'));

exports.generate = function() {

}

exports.import = function(data) {

  if (!data.collection) {
    return Promise.reject('collection name is required')
  }

  if (!data.api) {
    return Promise.reject('API url is required')
  }

  if (!data.filename) {
    return Promise.reject('JSON file is required')
  }

  var client = new ItemsAPI(data.api, data.collection)

  return fs.readFileAsync(data.filename, 'utf-8')
  .then(function(res) {
    return JSON.parse(res)
  })
  .then(function(res) {
    if (data.limit) {
      return res.slice(0, parseInt(data.limit))
    }
    return res
  })
  .then(function(list) {
    return client.deleteAllItems()
    .then(function() {
      console.log('Importing ' + list.length + ' items, please wait..');
      return client.addBulkItems(list)
      .then(function(res) {
        //console.log(res);
        return res
      })
    })
  })
}
