const Palas = require('../lib/Palas');

function create(args) {
  const { target } = args;

  const palas = new Palas(target);

  palas.create(target, args);
}

module.exports = create;
