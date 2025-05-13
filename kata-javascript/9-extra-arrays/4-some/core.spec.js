const assert = require('assert');
const core = require('./core');

describe('Some', () => {
  describe("#anyGreaterThan10()", () => {
    it("Check to see if any of the elements in the array are numbers greater than 10.", () => {
      const goodInput = [8, 9, 10, 11];
      assert.equal(core.anyGreaterThan10(goodInput), true);

      const badInput = [1, 2, 3, 4];
      assert.equal(core.anyGreaterThan10(badInput), false);
    });
  });

  describe("#longWord()", () => {
    it("Check to see if any of the strings in the array is longer than 10 characters.", () => {
      const goodInput = ["democracy", "aristocracy"];
      assert.equal(core.longWord(goodInput), true);

      const badInput = ["democracy", "republic"];
      assert.equal(core.longWord(badInput), false);
    });
  });

  describe("#truePossibilities()", () => {
    it('Check to see if any of the elements in the matrix are true.', function () {
      const goodInput = [
        [false, false, false],
        [false, false, false],
        [false, false, true]
      ];
      assert.equal(core.truePossibilities(goodInput), true);

      const badInput = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ];
      assert.equal(core.truePossibilities(badInput), false);
    });
  });

  describe("#lostCarcosa()", () => {
    it("Check to see if 'Lost' is in the phrase (using some).", () => {
      const goodInput = [
        "Strange is the night where black stars rise,",
        "And strange moons circle through the skies,",
        "But stranger still is",
        "Lost Carcosa.",
      ];
      assert.equal(core.lostCarcosa(goodInput), true);

      const badInput = [
        "Along the shore the cloud waves break,",
        "The twin suns sink behind the lake,",
        "The shadows lengthen",
        "In Carcosa.",
      ];
      assert.equal(core.lostCarcosa(badInput), false);
    });
  });
});
