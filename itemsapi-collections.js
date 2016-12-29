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



//[ '/usr/bin/nodejs',
  //'/home/matt/itemsapi-cli/itemsapi-collections' ]

if (process.argv.length < 3) {
  program.outputHelp()
}

program.parse(process.argv);
