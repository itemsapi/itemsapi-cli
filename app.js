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

console.log();
console.log('Welcome in ItemsAPI generator!'.green);

program
  .version('0.0.1')
  //.option('-h, --elasticsearch_url', 'Elasticsearch Url')

program
  .command('generate <name>')
  .description('Generate ItemsAPI web application')
  //.option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .option('-h, --elasticsearch_url <url>', 'Elasticsearch Url')
  //.action(function(env, options){
  .action(function(name, env){
    console.log('ItemsAPI starter is being installed.. Please wait..');
    app_dir = name

    if (fs.existsSync(app_dir)) {
      //colors.red(txt); //display the help text in red on the console
      console.log(`The app name \'${app_dir}\' already exists. Please choose another name and try again!`.red);
      process.exit();
    }

    //console.log('es url');
    //console.log(name);
    //console.log(env);
    //console.log(env.elasticsearch_url);
    //console.log(program.elasticsearch_url);

    //process.exit()

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

if (
  !process.argv.slice(2).length ||
  (process.argv.length > 2 && process.argv.indexOf('generate') === -1)
) {
  program.outputHelp();
  console.log('  Examples:');
  console.log('');
  console.log('    $' + ' itemsapi generate my-app'.green + ' (simplest installation)');
  console.log('    $' + ' itemsapi generate --elasticsearch_url=http://localhost:9200 my-app'.green + ' (your custom elasticsearch url)');
  console.log('');
}

program.parse(process.argv);
