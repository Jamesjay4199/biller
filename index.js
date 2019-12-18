#!/usr/bin/env node


// modify require to use esm which allows ES6 imports.
require = require('esm')(module);
const chalk = require('chalk');

try {
  // import the cli function from cli.js
  require('./src/cli').cli(process.argv);
} catch(error) {
  console.log(chalk.redBright(`Error: ${error.message}`))
}
