#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var Promise = require('bluebird')
var _ = require('lodash')
var simpleGit = require('simple-git')()

var colors = require('colors');
var app_dir = './my-app'
var service = require('./src/actions')

program
  .version('0.0.2')
  //.usage('[options]')
  .option('-a, --api [api]', 'ItemsAPI URL i.e. http://localhost:4000/api/v1')

program
  .command('generate <name>')
  .description('Generate ItemsAPI web application')
  .action(function(name, env){
    console.log('ItemsAPI starter is being installed.. Please wait..');
    app_dir = name

    if (fs.existsSync(app_dir)) {
      console.log(`The app name \'${app_dir}\' already exists. Please choose another name and try again!`.red);
      process.exit();
    }

    var path = app_dir

    return Promise.resolve(
      simpleGit.clone('https://github.com/itemsapi/starter', app_dir)
    )
    .then(function(val) {
      console.log();
      console.log('ItemsAPI repository has been cloned..'.green);
      console.log();
      console.log('Install dependencies now:');
      console.log('cd %s && npm install', path);
    })
  })

program
  //.command('import <collection> <filename>')
  .command('import')
  .description('Import JSON data into ItemsAPI')
  .option('-c, --collection [collection]', 'Collection name')
  .option('-l, --limit [limit]', 'Amount of items you want to load')
  .option('-f, --filename [filename]', 'JSON file')
  .action(function(options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red);
    }

    console.log('Trying to import data.. Please wait..');

    options.api = program.api

    service.import(options)
    .then(function(val) {
      console.log('Data has been imported successfully..'.green);
    })
    .catch(function(err) {
      console.log(err);
      console.log('Unexpected error..'.red);
    })
    //console.log('ItemsAPI url: ', program.api);
  })

program
  .command('reindex')
  .description('Reindex collection with new collection configuration')
  .option('-c, --collection <collection>', 'Collection name')
  .action(function(name, options){
    if (!program.api) {
      console.log(`The --api parameter is required`.red);
    }
    if (!program.myoption) {
      //throw new Error('--myoption required')
    }
    console.log('Trying to import data.. Please wait..');
  })
//console.log('Usage: itemsapi COMMAND [--api api_url] [command-specific-options]');

if (
  //true ||
  !process.argv.slice(2).length
  //!process.argv.slice(2).length ||
  //(process.argv.length > 2 && process.argv.indexOf('generate') === -1)
) {
  program.outputHelp();
  //program.outputHelp('import');
  //console.log('test');
  //program.outputHelp('generate');
  //console.log('  Examples:');
  //console.log('');
  //console.log('    $' + ' itemsapi generate my-app'.green + ' (simplest installation)');
  //console.log('    $' + ' itemsapi generate --elasticsearch_url=http://localhost:9200 my-app'.green + ' (your custom elasticsearch url)');
  //console.log('');
}

program.parse(process.argv);
