const path = require('path');
const generateBaseDirectories = require('./directories/base');
const tools = require('./tools');
const steps = require('../utils/steps');
const { getDependencies, getDevDependencies } = require('./constants/dependencies');

process.on('unhandledRejection', (error) => {
  console.log('unhandled rejection: ', error);
});

class Palas {
  constructor(target) {
    this.cwd = process.cwd();
    this.target = target;
    this.name = target;
  }

  async create(projectPath, createOptions) {
    let target = projectPath || this.target || this.cwd;
    if (!path.isAbsolute(target)) {
      target = path.resolve(this.cwd, target);
    }
    const config = {
      name: this.name,
      target: this.target,
    };

    const options = await tools.fetchOptions(createOptions);

    Object.assign(config, {
      options,
    });

    const dependencies = getDependencies(config);
    const devDependencies = getDevDependencies(config);

    const baseDirectories = generateBaseDirectories(target, config);

    const createSteps = [{
      title: 'create base directories...',
      action() {
        return tools.createDirectories(baseDirectories, config);
      },
    }, {
      title: 'install dependencies...',
      action() {
        return tools.installDependencies(target, dependencies);
      },
    }, {
      title: 'install dev dependencies...',
      action() {
        return tools.installDevDependencies(target, devDependencies);
      },
    }, {
      title: 'install eslint dependencies...',
      action() {
        return tools.installESLintDependency(target);
      },
    }];

    if (config.options.useDocker) {
      createSteps.push({
        title: 'make entry point...',
        action() {
          return tools.makeEntrypoint(target);
        },
      });
    }


    await steps(createSteps);

    console.log('created success.');
    console.log(`use 'cd ${this.target} && yarn run dev' to start.`);
  }
}

module.exports = Palas;
