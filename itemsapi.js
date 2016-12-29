#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var Promise = require('bluebird')
var _ = require('lodash')
var simpleGit = require('simple-git')()

var colors = require('colors');
var app_dir = './my-app'

program
  .version('0.0.2')

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
  .command('collections', 'manage collections')
  .command('projects', 'manage projects (collection + mapping)')
  .command('items', 'manage items')

if (process.argv.length < 2) {
  program.outputHelp()
}


program.parse(process.argv);
