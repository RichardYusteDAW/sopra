var assert = require('assert'),
  core = require('./core');

describe('Reduce', () => {
  describe('#sum()', () => {
    it('Sum all the numbers in the array', () => {
      var input = [10, 15, 20, 25, 30, 35];
      var expected = 135;
      var actual = core.sum(input);

      assert.equal(actual, expected);
    });
  });

  describe('#productAll()', () => {
    it('Return the product of all items in the matrix', () => {
      var input = [[1, 2, 3], [4, 5], [6]];
      var expected = 720;
      var actual = core.productAll(input);

      assert.equal(actual, expected);
    });
  });

  describe('#objectify()', () => {
    it('Turns an array of arrays into an object', () => {
      var input = [
        ['Thundercats', '80s'],
        ['The Powerpuff Girls', '90s'],
        ['Sealab 2021', '00s']
      ];
      var expected = {
        Thundercats: '80s',
        'The Powerpuff Girls': '90s',
        'Sealab 2021': '00s'
      };
      var actual = core.objectify(input);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#luckyNumbers()', () => {
    it('Return a fortune like sentence with lucky numbers', () => {
      var input = [30, 48, 11, 5, 32];
      var expected = 'Your lucky numbers are: 30, 48, 11, 5, and 32';
      var actual = core.luckyNumbers(input);

      assert.equal(actual, expected);
    });
  });
});