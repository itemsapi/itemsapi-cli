const vorpal = require('vorpal')();
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();
var generators = require('yeoman-generator');

//env.register(require.resolve('generator-npm'), 'npm:app');
env.register(require.resolve('./app.js'), 'itemsapi:app');

//var GeneratorNPM = generators.Base.extend([> put your methods in here <]);
//env.registerStub(GeneratorNPM, 'npm:app');

const options = {
  disableNotifyUpdate: false
};

vorpal
  .command('generate ', 'alias for generate app')
  .autocomplete(['app'])
  .action(function (args, callback) {
    this.log('To generate app');
  })

if (process.argv.length > 2) {
  vorpal.parse(process.argv);
} else {
  // interactive shell
  vorpal.log(`Welcome to the ItemsAPI command line.`);
  vorpal.log('Type "exit" to quit, "help" for a list of commands.');

  vorpal
  .delimiter('itemsapi-cli$')
  .show();
}
