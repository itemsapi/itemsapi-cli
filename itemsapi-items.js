#!/usr/bin/env node

var program = require('commander');
var service = require('./src/items')
var colors = require('colors');

program
  .usage('test')
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')
  .option('-c, --collection [collection]', 'Collection name')


program
  .command('import')
  .description('Import JSON data into collection')
  .option('-l, --limit [limit]', 'Amount of items you want to load')
  .option('-f, --filename [filename]', 'JSON file')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red);
      process.exit()
    }

    if (!program.collection) {
      console.log(`The --collection parameter is required`.red);
      process.exit()
    }

    if (!options.collection) {
      console.log(`The --filename parameter is required`.red);
      process.exit()
    }

    console.log('Trying to import data.. Please wait..');

    options.api = program.api
    options.collection = program.collection

    service.import(options)
    .then(function(val) {
      console.log('Data has been imported successfully..'.green)
      var url = program.api + '/items/' + program.collection;
      console.log('Open %s in web browser to test it out', url);
    })
    .catch(function(err) {
      console.log(err)
      console.log('Unexpected error..'.red)
    })
  })

program
  .command('export')
  .description('Export items')
  //.option('-l, --limit [limit]', 'Amount of items you want to load')
  //.option('-f, --filename [filename]', 'JSON file')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red);
      process.exit()
    }

    if (!program.collection) {
      console.log(`The --collection parameter is required`.red);
      process.exit()
    }

    options.api = program.api
    options.collection = program.collection

    service.export(options)
    .then(function(val) {
      console.log(JSON.stringify(val, null, 2));
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
