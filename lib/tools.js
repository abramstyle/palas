const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const assert = require('assert');
const inquirer = require('inquirer');
const { objectUtils } = require('fanas');
const transformer = require('./transformer');
const utils = require('../utils');

const tools = {
  createPath(dir) {
    return fs.ensureDir(dir);
  },

  createFile(file, content) {
    return fs.outputFile(file, content);
  },

  createDirectories(object, config) {
    const promises = object.paths.map((item) => {
      const realPath = path.resolve(object.workDirectory, item.path);
      if (utils.isDir(realPath)) {
        return tools.createPath(realPath);
      }
      if (item.template) {
        const template = transformer(item.template, config);
        return tools.createFile(realPath, template);
      }

      return realPath;
    });

    return Promise.all(promises);
  },

  async makeEntrypoint(workDirectory) {
    const entrypointPath = path.resolve(workDirectory, './entrypoint.sh');
    const command = `chmod +x ${entrypointPath}`;
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  },

  async getDependencies(pkg) {
    assert.ok(pkg, 'package is required.');
    const command = `npm info "${pkg}@latest" peerDependencies --json`;
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      throw new Error(stderr);
    }

    const dependenciesObject = JSON.parse(stdout);
    const dependencies = Object.keys(dependenciesObject).map(key => `${key}@${dependenciesObject[key]}`);

    return dependencies;
  },

  async installDependencies(cwd, dependencies) {
    assert.ok(Array.isArray(dependencies), 'expect denpendencies as an array.');
    assert.ok(path, 'expect denpendencies as an array.');

    const dependenciesString = dependencies.join(' ');
    const command = `yarn add ${dependenciesString}`;
    const { stdout, stderr } = await exec(command, {
      cwd,
    });

    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  },

  async installDevDependencies(cwd, dependencies) {
    assert.ok(Array.isArray(dependencies), 'expect denpendencies as an array.');
    assert.ok(cwd, 'expect denpendencies as an array.');

    const dependenciesString = dependencies.join(' ');
    const command = `yarn add ${dependenciesString} -D`;
    const { stdout, stderr } = await exec(command, {
      cwd,
    });

    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  },

  async installESLintDependency(cwd) {
    assert.ok(path, 'expect denpendencies as an array.');

    const command = 'npx install-peerdeps -Y --dev eslint-config-airbnb-base';
    const { stdout, stderr } = await exec(command, {
      cwd,
    });

    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  },

  async fetchOptions(createOptions) {
    const options = objectUtils.pick(createOptions, [
      'useGrpc',
      'useDocker',
    ]);

    if (typeof options.useGrpc === 'undefined') {
      const grpcOptions = await inquirer.prompt({
        type: 'confirm',
        message: 'Use gRPC?',
        name: 'use',
      });
      Object.assign(options, {
        useGrpc: grpcOptions.use,
      });
    }

    if (typeof options.useDocker === 'undefined') {
      const dockerOptions = await inquirer.prompt({
        type: 'confirm',
        message: 'Use Docker?',
        name: 'use',
      });

      Object.assign(options, {
        useDocker: dockerOptions.use,
      });
    }

    if (options.useConfigCenter && typeof options.configCenterKey === 'undefined') {
      const configCenterKey = await inquirer.prompt({
        type: 'input',
        message: 'enter config center keys:',
        name: 'key',
      });

      Object.assign(options, {
        configCenterKey: configCenterKey.key,
      });
    }

    return options;
  },
};

module.exports = tools;
