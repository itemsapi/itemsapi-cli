#!/usr/bin/env node

var program = require('commander');
var service = require('./src/collections')
var colors = require('colors');

program
  .usage('test')
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')

program
  .command('list')
  .description('List all collections')
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red)
    }
    //console.log(program.api);

    options.api = program.api

    service.list(options)
    .then(function(val) {
      console.log(val)
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
