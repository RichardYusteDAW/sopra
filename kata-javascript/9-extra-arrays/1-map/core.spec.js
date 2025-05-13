const assert = require('assert');
const core = require('./core');

describe('Map', () => {
  describe('#multiplyBy10()', () => {
    it('Multiplies all elements in an array by 10', () => {
      const input = [45, 1, -10, 11, 250];
      const expected = [450, 10, -100, 110, 2500];
      const actual = core.multiplyBy10(input);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#shiftRight()', () => {
    it('Shifts items in an array to the right by one', () => {
      const input = [{ name: '' }, 10, 'left-side'];
      const expected = ['left-side', { name: '' }, 10];
      const actual = core.shiftRight(input);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#onlyVowels()', () => {
    it('Removes any non-vowel character from words in an array', () => {
      const input = ['average', 'exceptional', 'amazing'];
      const expected = ['aeae', 'eeioa', 'aai'];
      const actual = core.onlyVowels(input);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#doubleMatrix()', () => {
    it('Doubles the numbers in the matrix, maintaining the same structure', () => {
      const input = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const expected = [[2, 4, 6], [8, 10, 12], [14, 16, 18]];
      const actual = core.doubleMatrix(input);

      assert.deepEqual(actual, expected);
    });
  });
});