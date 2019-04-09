# Palas
Palas is a Node.js project scaffolding generator based on Koa.js. With the API, create your project super fast.

# Includes
- Docker
- CI(Circle CI)
- ORM（Sequelize.js)
- gRPC support
- ESLint

# Usage
```bash
yarn add -g palas
palas create <projectPath>
cd <projectPath>
yarn start
```

Palas will install latest version of dependencies.

# Options
Some configuration will be collected with a interactive command line. But if you specified configuration in cli options, then the interactive command line will not appear.

## Available options
### `--use-grpc`
Add gRPC support in project. This will install `grpc`, `@grpc/proto-loader` dependencies.

### `--use-docker`
Add docker support. This will generate `Dockerfile`, `docker-compose.yml` and `entrypoint.sh`.

# Code styles
Use eslint to lint code style.

## eslint configuration
eslint use `airbnb-base`, and use `node-security` to ensure code scurity.

# Code conventions
## file structure
```
project
|-.gitignore
|-.eslintrc
|-.eslint
|-.env
|-docker-compose.yml
|-Dockerfile
|-entrypoint.sh
|-package.json
|-server.js
|-yarn.lock
|-app
  |-grpc
    |-controllers
    |-protos
    |_index.js
  |-http
    |-routes
    |-index.js
  |-services
    |-logger.js
  |-index.js
|-.circle
  |-config.yml
|-config
  |-app.config.js
|-helpers
  |-env.js
```
## convention
Because of this scaffolding generator support both gRPC and HTTP client.
