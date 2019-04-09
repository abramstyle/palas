const fs = require('fs-extra');
const jst = require('../utils/template');
/*
Javascript Template parser
 */
function transformer(template, config) {
  let templateContent = null;

  if (template.endsWith('js')) {
    /* eslint "import/no-dynamic-require": 0 */
    templateContent = require(template);
  } else {
    templateContent = fs.readFileSync(template, { encoding: 'utf-8' });
  }

  if (typeof templateContent === 'function') {
    templateContent = templateContent();
  }

  return jst(templateContent, config);
}

module.exports = transformer;
