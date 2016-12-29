#!/usr/bin/env node

var program = require('commander');
var service = require('./src/projects')
var colors = require('colors');

program
  .usage('test')
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')
  .option('-c, --collection [collection]', 'Collection name')

program
  .command('create')
  .description('Create new project')
  .option('-u, --url [url]', 'Amount of items you want to load')
  .option('-f, --filename [filename]', 'JSON file')
  .action(function(options) {
    if (!program.api) {
      console.log(`The --api parameter is required`.red)
      process.exit()
    }

    if (!program.api) {
      console.log(`The --collection parameter is required`.red)
      process.exit()
    }

    if (!options.url && !options.filename) {
      console.log(`The --url or --filename parameter is required`.red)
      process.exit()
    }

    options.api = program.api

    service.create(options)
    .then(function(val) {
      console.log('Created new project: %s', val.name);
      var url = program.api + '/items/' + val.name;
      console.log('Open %s in web browser to test it out', url);
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
