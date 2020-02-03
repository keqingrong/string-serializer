const { parseArray } = require('../parse-array');

test('Test parseArray', () => {
  expect(parseArray(null)).toBe(null);
  expect(parseArray(undefined)).toBe(undefined);
  expect(parseArray('')).toBe(null);
  expect(parseArray('   ')).toBe(null);

  expect(parseArray([])).toEqual([]);
  expect(parseArray([1, 2, 3])).toEqual([1, 2, 3]);
  expect(parseArray('[]')).toEqual([]);
  expect(parseArray('[  ]')).toEqual([]);
  expect(parseArray(' [  ] ')).toEqual([]);
  expect(parseArray('[1,2,3]')).toEqual([1, 2, 3]);
  expect(parseArray(' [1,2,3] ')).toEqual([1, 2, 3]);
  expect(parseArray('["1","2","3"]')).toEqual(["1", "2", "3"]);
  expect(parseArray('["a","b","c"]')).toEqual(["a", "b", "c"]);
  expect(parseArray('[{"a":1},{"a":2}]')).toEqual([{ a: 1 }, { a: 2 }]);

  expect(parseArray("['1','2','3']")).toEqual(["1", "2", "3"]);
  expect(parseArray('[a]')).toEqual(["a"]);
  expect(parseArray('[a,b,c]')).toEqual(["a", "b", "c"]);
  expect(parseArray('[{a:1},{a:2}]')).toEqual([{ a: 1 }, { a: 2 }]);

  expect(parseArray('a,b,c')).toEqual(["a", "b", "c"]);
  expect(parseArray('{a:1},{a:2}')).toEqual([{ a: 1 }, { a: 2 }]);
  expect(parseArray('1,2,3')).toEqual([1, 2, 3]);
  expect(parseArray('a')).toEqual(["a"]);
  expect(parseArray('0')).toEqual(["0"]);
  expect(parseArray(',1')).toEqual(["", 1]);
  expect(parseArray('"1","2","3"')).toEqual(["1", "2", "3"]);

  expect(parseArray(false)).toEqual([false]);
  expect(parseArray(0)).toEqual([0]);
  expect(parseArray('[')).toEqual(["["]);
});
