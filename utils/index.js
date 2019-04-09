const path = require('path');

const utils = {
  isDir(pathString) {
    const parts = path.parse(pathString);
    return !parts.ext && pathString.endsWith('/');
  },
};

module.exports = utils;
