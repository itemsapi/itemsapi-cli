#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var util = require('util');

var Promise = require('bluebird')
var _ = require('lodash')
//var fs = Promise.promisifyAll(require('fs-extra'))
var simpleGit = require('simple-git')()

var colors = require('colors');
var app_dir = './my-app'

program
  .version('0.0.1')
  .option('-h, --elasticsearch_url', 'Elasticsearch Url')

program
  .command('generate <name>')
  .description('generate ItemsAPI application')
  //.option("-s, --setup_mode [mode]", "Which setup mode to use")
  //.action(function(env, options){
  .action(function(name){
    console.log('ItemsAPI starter is being installed.. Please wait..');
    app_dir = name

    if (fs.existsSync(app_dir)) {
      //colors.red(txt); //display the help text in red on the console
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
  });

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $' + ' itemsapi generate my-app'.green + ' (simplest installation)');
  console.log('    $' + ' itemsapi --elasticsearch_url=http://localhost:9200 generate my-app'.green + ' (your custom elasticsearch url)');
  console.log('');
});

program.parse(process.argv);
