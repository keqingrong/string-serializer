const { parseObject } = require('../parse-object');

test('Test parseObject', () => {
  expect(parseObject(undefined)).toBe(undefined);
  expect(parseObject(null)).toBe(null);
  expect(parseObject('')).toEqual(null);
  expect(parseObject('  ')).toEqual(null);

  expect(parseObject({})).toEqual({});
  expect(parseObject({ a: 1 })).toEqual({ a: 1 });

  expect(parseObject('{}')).toEqual({});
  expect(parseObject('{a:1}')).toEqual({ a: 1 });
  expect(parseObject('{"a":1}')).toEqual({ a: 1 });
  expect(parseObject('{"a":[1,2,3]}')).toEqual({ a: [1, 2, 3] });

  expect(parseObject("{'a':1}")).toEqual({ a: 1 });
});
