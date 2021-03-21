const { format_date, format_plural, format_possessive } = require('../utils/helpers');

test('format_date() returns a date string M/D/YYYY', () => {
  const date = new Date('2020-03-20 16:12:03');
  
  expect(format_date(date)).toBe('3/20/20');
});

test('format_plural() return the correct word form', () => {
  expect(format_plural('lion', 1)).toBe("lion");
  expect(format_plural('tiger', 0)).toBe("tigers");
  expect(format_plural('tiger', 3)).toBe("tigers");
});

test(`format_possessive adds 's or '`, () => {
  expect(format_possessive('matt gross')).toBe("matt gross'");
  expect(format_possessive('allie tiger')).toBe("allie tiger's")
});