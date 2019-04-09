function getDependencies(config) {
  const dependencies = [
    'koa',
    'koa-logger',
    'koa-router',
    'koa-static',
    'dotenv',
  ];

  if (config.options.useGrpc) {
    const grpcDependencies = [
      '@grpc/proto-loader',
      'grpc',
    ];

    dependencies.push(...grpcDependencies);
  }

  return dependencies;
}

function getDevDependencies() {
  const devDependencies = [
    'nodemon',
    'eslint-plugin-security',
  ];

  return devDependencies;
}

exports.getDependencies = getDependencies;
exports.getDevDependencies = getDevDependencies;
