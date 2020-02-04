const { parseInt, parseFloat } = require('..');

test('Test parseInt', () => {
  expect(parseInt('1.33')).toBe(1);
  expect(parseInt('-1.33')).toBe(-1);
  expect(parseInt('0.333')).toBe(0);
  expect(parseInt('0xff')).toBe(255);
  expect(parseInt('1111', 2)).toBe(15);
});

test('Test parseFloat', () => {
  expect(parseFloat('1.33')).toBe(1.33);
  expect(parseFloat('0.0314E+2')).toBe(3.14);
  expect(parseFloat('133')).toBe(133);
});
