var ItemsAPI = require('itemsapi-node');
var _ = require('lodash');
var Promise = require('bluebird');

exports.list = function(data) {
  return new Promise(function(resolve, reject) {
    return resolve('Collections list')
  })
}
