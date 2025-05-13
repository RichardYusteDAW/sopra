const assert = require('assert');
const core = require('./core');

describe('Every', () => {
  describe("#allEven()", () => {
    it("Check to see if all elements in an array are even numbers.", () => {
      const goodInput = [2, 4, 10];
      assert.equal(core.allEven(goodInput), true);

      const badInput = [2, 4, 11];
      assert.equal(core.allEven(badInput), false);
    });
  });

  describe("#allEven()", () => {
    it('Check to see if all elements in an array are of the same type.', () => {
      const goodInput = [1, 2, 3];
      assert.equal(core.allSameType(goodInput), true);

      const badInput = [1, 2, 3, '4'];
      assert.equal(core.allSameType(badInput), false);
    });
  });

  describe("#positiveMatrix()", () => {
    it('Check to see if every element in the matrix is an array and that every element in the array is greater than 0.', () => {
      const goodInput = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      assert.equal(core.positiveMatrix(goodInput), true);

      const badInput = [[-1, 2, 3], [4, -5, 6], [7, 8, -9]];
      assert.equal(core.positiveMatrix(badInput), false);
    });
  });

  describe("#allSameVowels()", () => {
    it("Check that all items in an array are strings and that they all only contain the same vowels.", () => {
      const goodInput = ["amalgam", "zoom", "cc"];
      assert.equal(core.allSameVowels(goodInput), true);

      const badInput = ["zoom", "oligopoly"];
      assert.equal(core.allSameVowels(badInput), false);
    });
  });
});