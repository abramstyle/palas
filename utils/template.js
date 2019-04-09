const { objectUtils } = require('fanas');
const _ = require('lodash');

function template(tmpl, object) {
  if (typeof tmpl !== 'string') {
    throw new TypeError('expect template as a string.');
  }

  if (!objectUtils.isObject(object)) {
    throw new TypeError('expect object as an object.');
  }

  const compiled = _.template(tmpl, {
    interpolate: /%{([\s\S]+?)}/,
  });

  const result = compiled(object);

  return result;
}

module.exports = template;
