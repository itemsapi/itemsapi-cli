const vorpal = require('vorpal')();
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

env.register(require.resolve('generator-npm'), 'npm:app');

var GeneratorNPM = generators.Base.extend(/* put your methods in here */);
env.registerStub(GeneratorNPM, 'npm:app');

vorpal
  .command('generate ', 'alias for generate app')
  .autocomplete(['app'])
  .action(function (args, callback) {
    this.log('To generate app');
    //env.run('npm:app', options, callback);
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
