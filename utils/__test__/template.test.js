const template = require('../template');

describe('Template', () => {
  test('render normal string', () => {
    const tmpl1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    expect(template(tmpl1, {})).toEqual(tmpl1);
  });
  test('render with props', () => {
    const tmpl = 'there is an %{name}, it so %{type}';
    const tmpl2 = 'there is an %{nam%e}, it so %{type}';
    const object = {
      name: 'apple',
      type: 'delicious',
    };

    expect(template(tmpl, object)).toEqual('there is an apple, it so delicious');
    expect(template(tmpl2, object)).toEqual('there is an %{nam%e}, it so delicious');
  });

  test('handle complicated template', () => {
    const tmpl = 'here is an %{name}, there is another %{name}, is all %{type}';

    const object = {
      name: 'apple',
      type: 'delicious',
    };

    expect(template(tmpl, object)).toEqual('here is an apple, there is another apple, is all delicious');
  });

  test('if invalid params passed, error will be thrown', () => {
    const tmpl = 'there is a %{name}, it so %{type}';
    const object = {
      name: 'apple',
      type: 'delicious',
    };

    const nonStringError = new TypeError('expect template as a string.');
    const nonObjectError = new TypeError('expect object as an object.');

    try {
      template(null, object);
    } catch (e) {
      expect(e).toEqual(nonStringError);
    }
    try {
      template(tmpl, null);
    } catch (e) {
      expect(e).toEqual(nonObjectError);
    }
  });
});
