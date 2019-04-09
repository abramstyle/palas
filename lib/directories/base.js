const { resolve } = require('path');

// .gt extension means "Palas Template"
// a tempate name means ../templates/<directory>.<subdirectory>.<evendeep>.<extension>.gt
function generateBaseDirectories(workDirectory, config) {
  const paths = [{
    path: './package.json',
    template: resolve(__dirname, '../templates/packageJson.js'),
  }, {
    path: './.eslintignore',
    template: resolve(__dirname, '../templates/.eslintignore.gt'),
  }, {
    path: './.eslintrc',
    template: resolve(__dirname, '../templates/.eslintrc.gt'),
  }, {
    path: './.gitignore',
    template: resolve(__dirname, '../templates/.gitignore.gt'),
  }, {
    path: './.env',
    template: resolve(__dirname, '../templates/.env.gt'),
  }, {
    path: './server.js',
    template: resolve(__dirname, '../templates/server.js.gt'),
  }, {
    path: './config/app.config.js',
    template: resolve(__dirname, '../templates/config.app.config.js.gt'),
  }, {
    path: './helpers/env.js',
    template: resolve(__dirname, '../templates/helpers.env.js.gt'),
  }, {
    path: './app/index.js',
    template: resolve(__dirname, '../templates/app.index.js.gt'),
  }, {
    path: './app/http/index.js',
    template: resolve(__dirname, '../templates/app.http.index.js.gt'),
  }, {
    path: './app/http/routes/index.js',
    template: resolve(__dirname, '../templates/app.http.routes.index.js.gt'),
  }, {
    path: './app/services/logger.js',
    template: resolve(__dirname, '../templates/app.services.logger.js.gt'),
  }, {
    path: './app/http/middlewares/',
  }];

  if (config.options.useGrpc) {
    const grpcPaths = [{
      path: './app/grpc/protos/cybertron.proto',
      template: resolve(__dirname, '../templates/app.grpc.protos.cybertron.proto.gt'),
    }, {
      path: './app/grpc/index.js',
      template: resolve(__dirname, '../templates/app.grpc.index.js.gt'),
    }, {
      path: './app/grpc/controllers/cybertron.js',
      template: resolve(__dirname, '../templates/app.grpc.controllers.cybertron.js.gt'),
    }];
    paths.push(...grpcPaths);
  }

  if (config.options.useDocker) {
    const dockerPaths = [{
      path: './entrypoint.sh',
      template: resolve(__dirname, '../templates/entrypoint.sh.gt'),
    }, {
      path: './Dockerfile',
      template: resolve(__dirname, '../templates/Dockerfile.gt'),
    }, {
      path: './docker-compose.yml',
      template: resolve(__dirname, '../templates/docker-compose.yml.gt'),
    }];
    paths.push(...dockerPaths);
  }

  return {
    workDirectory,
    paths,
  };
}

module.exports = generateBaseDirectories;
