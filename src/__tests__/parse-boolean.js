const { parseBoolean } = require('../parse-boolean');

test('Test parseBoolean', () => {
  expect(parseBoolean('true')).toBe(true);
  expect(parseBoolean('false')).toBe(false);
  expect(parseBoolean('0')).toBe(false);
  expect(parseBoolean('null')).toBe(false);
  expect(parseBoolean('undefined')).toBe(false);
  expect(parseBoolean('')).toBe(false);
  expect(parseBoolean('foo')).toBe(true);
});
