// array - `Array.prototype.findIndex`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`Array.prototype.findIndex` makes finding items in arrays easier", () => {
  it("takes a compare function, returns the index where it returned true", () => {
    const foundAt = [false, true].findIndex(item => item === true);

    assert.equal(foundAt, 1);
  });

  it("returns the first position it was found at", () => {
    const foundAt = [0, 1, 1, 1].findIndex((item) => (item == 1));

    assert.equal(foundAt, 1);
  });

  it("returns `-1` when nothing was found", () => {
    const foundAt = [1, 2, 3].findIndex((item) => item > 3);

    assert.equal(foundAt, -1);
  });

  it("the findIndex callback gets the item, index and array as arguments", () => {
    const three = 3;
    const containsThree = (arr) => arr.indexOf(three) > -1;
    const theSecondThree = (item, index, arr) => {
      return containsThree(arr.slice(0, index));
    };
    const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree);

    assert.equal(foundAt, 4);
  });

  it("combined with destructuring complex compares become short", () => {
    const bob = { name: "Bob" };
    const alice = { name: "Alice" };
    const foundAt = [bob, alice].findIndex(({ name: { length } }) => length > 3);

    assert.equal(foundAt, 1);
  });
});