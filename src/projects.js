var ItemsAPI = require('itemsapi-node');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

/**
 * create project (collection + mapping)
 */
exports.create = function(data) {

  var client = new ItemsAPI(data.api, data.collection)

  if (data.url) {
    return client.createProject({
      url: data.url
    })
  } else {
    return fs.readFileAsync(data.filename, 'utf-8')
    .then(function(res) {
      return JSON.parse(res)
    })
    .then(function(res) {
      return client.createProject({
        data: res
      })
    })
  }
}
