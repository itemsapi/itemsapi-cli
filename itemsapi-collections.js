#!/usr/bin/env node

var program = require('commander');
var service = require('./src/collections')
var colors = require('colors');
var Table = require('cli-table');
var _ = require('lodash')

program
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')
  //.usage('test')

program
  .command('get')
  .description('Get collection')
  .option('-c, --collection [collection]', 'Collection name')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red)
      process.exit()
    }

    if (!options.collection) {
      console.log(`The --collection parameter is required`.red);
      process.exit()
    }

    options.api = program.api

    service.get(options)
    .then(function(res) {
      console.log(JSON.stringify(res, null, 2))
    })
    .catch(function(err) {
      console.log(err)
      console.log('Unexpected error..'.red)
    })
  })

program
  .command('reindex')
  .description('Reindex collection')
  .option('-c, --collection [collection]', 'Collection name')
  .option('--new_index [new_index]', 'New index name')
  .option('--new_type [new_type]', 'New type name')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red)
      process.exit()
    }

    if (!options.collection) {
      console.log(`The --collection parameter is required`.red);
      process.exit()
    }

    options.api = program.api

    console.log('Started reindexing.. Please wait..');

    service.reindex(options)
    .then(function(res) {
      console.log('Same values: name: %s. New values: index: %s, type: %s', res.name, res.index, res.type);
      console.log('Reindexing finished');
    })
    .catch(function(err) {
      console.log(err)
      console.log('Unexpected error..'.red)
    })
  })

program
  .command('list')
  .description('List all collections')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red)
      process.exit()
    }

    options.api = program.api

    service.list(options)
    .then(function(res) {

      var table = new Table({
        head: ['Name', 'Url']
      })

      var rows = _.map(res, function(val) {
        table.push([val.name, program.api + '/items/' + val.name])
        //return [val.name, 'fff']
      })

      console.log(table.toString());

    })
    .catch(function(err) {
      console.log(err)
      console.log('Unexpected error..'.red)
    })
  })

if (process.argv.length < 3) {
  program.outputHelp()
}

program.parse(process.argv);
