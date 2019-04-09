#!/usr/bin/env node
const create = require('../scripts/create');

const r = require('yargs').usage('$0 <cmd> [options]')
  .command('create <target> [options]', 'Create a palas project', (yargs) => {
    return yargs.options('use-grpc', {
      alias: 'grpc',
      default: undefined,
      describe: 'use grpc',
      type: 'boolean'
    }).options('use-config-center', {
      alias: 'config-center',
      default: undefined,
      describe: 'use config center',
      type: 'boolean'
    }).options('use-docker', {
      alias: 'docker',
      default: undefined,
      describe: 'use docker',
      type: 'boolean'
    }).options('config-center-key', {
      default: undefined,
      describe: 'config center secret key',
      type: 'string'
    })
    help();
  }, (argv) => {
    create(argv);
  })
  .demandCommand(1, 'You must select a command to continue.')
  .help()
  .argv;

module.exports = r;
