const { stringifyArray } = require('..');

test('Test stringifyArray', () => {
  expect(stringifyArray(null)).toBe('');
  expect(stringifyArray(undefined)).toBe('');
  expect(stringifyArray('')).toBe('');
  expect(stringifyArray('  ')).toBe('');
  expect(stringifyArray('[]')).toBe('[]');
  expect(stringifyArray('1,2,3')).toBe('[1,2,3]');
  expect(stringifyArray([])).toBe('[]');
  expect(stringifyArray([1, 2, 3])).toBe('[1,2,3]');
  expect(stringifyArray([{ a: 1 }, { a: 2 }])).toBe('[{"a":1},{"a":2}]');
});
