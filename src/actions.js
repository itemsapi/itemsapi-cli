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

  return detectJSONFileType(data.filename)
  .then(function(res) {
    if (res === 'stream') {
      return importStreamJson(data)
    } else {
      return importNormalJson(data)
    }
  })

}

var importStreamJson = function(data) {

  console.log('Importing items in stream mode, please wait..');
  var client = new ItemsAPI(data.api, data.collection)
  return new Promise(function(resolve, reject) {
    var counter = 0;
    var bulk = [];
    var counter_limit = 5000
    var concurrency = 500
    var added = 1

    client.deleteAllItems()
    .then(function(res) {
      var stream = fs.createReadStream(data.filename)
      .pipe(JSONStream.parse())

      stream.on('data', function (item) {
        if (counter >= counter_limit) {
          stream.pause();

          return client.addBulkItems(bulk)
          .then(function(res) {
            counter = 0;
            bulk = []
            console.log(added + ' series added!');
            added++
            stream.resume()
          })
        } else {
          ++counter
          bulk.push(item)
        }
      })
      .on('end', function (data) {
        client.addBulkItems(bulk)
        .then(function(res) {
          return resolve()
        })
      })
      .on('close', function (data) {
      })
      .on('error', function (err) {
        return reject(err)
      })
    })
  })
}

var importNormalJson = function(data) {
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


/**
 * return normal or stream
 */
var detectJSONFileType = function(path) {
  return new Promise(function (resolve, reject) {
    var stream = fs.createReadStream(path, {encoding: 'utf8'});
    var output

    stream.on('data', function (chunk) {
      chunk.split('').forEach(function(o) {
        if (!output) {
          if (o == '[') {
            output = 'normal'
            return stream.destroy()
          } else if(o == '{') {
            output = 'stream'
            return stream.destroy()
          }
        }
      })
    })
    .on('end', function () {
    })
    .on('close', function () {
      resolve(output);
    })
    .on('error', function (err) {
      reject(err);
    })
  })
}
