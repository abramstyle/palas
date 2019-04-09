const os = require('os');

function generatePackage() {
  const packageJson = {
    name: '%{name}',
    version: '0.1.0',
    scripts: {
      dev: 'NODE_ENV=development nodemon server',
      prod: 'NODE_ENV=production node server',
    },
    dependencies: {
    },
    devDependencies: {
    },
    license: 'MIT',
  };

  return JSON.stringify(packageJson, null, 2) + os.EOL;
}

module.exports = generatePackage;
