const utils = require('..');

describe('Test Utils', () => {
  test('isDir', () => {
    const paths = [{
      path: './app/middlewares/',
      isDir: true,
    }, {
      path: './Dockerfile',
      isDir: false,
    }, {
      path: './package.json',
      isDir: false,
    }];

    paths.forEach((item) => {
      expect(utils.isDir(item.path)).toBe(item.isDir);
    });
  });
});
