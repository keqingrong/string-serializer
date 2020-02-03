const { stringifyObject } = require('../stringify-object');

test('Test stringifyObject', () => {
  expect(stringifyObject(null)).toBe('');
  expect(stringifyObject(undefined)).toBe('');
  expect(stringifyObject('')).toBe('');
  expect(stringifyObject('  ')).toBe('');
  expect(stringifyObject('{}')).toBe('{}');
  expect(stringifyObject('{a:1}')).toBe('{"a":1}');
  expect(stringifyObject("{'a':1}")).toBe('{"a":1}');
  expect(stringifyObject('{"a":1}')).toBe('{"a":1}');
  expect(stringifyObject('{"a":[1,2,3]}')).toBe('{"a":[1,2,3]}');
  expect(stringifyObject({})).toBe('{}');
  expect(stringifyObject({ a: 1 })).toBe('{"a":1}');
  expect(stringifyObject({ a: [1, 2, 3] })).toBe('{"a":[1,2,3]}');
});
