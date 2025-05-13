// array - `Array.prototype.find`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`Array.prototype.find` makes finding items in arrays easier", () => {
  it("takes a compare function", () => {
    const found = [false, true].find(item => item === true);

    assert.equal(found, true);
  });

  it("returns the first value found", () => {
    const found = [0, 1, 2].find((item) => item > 1);

    assert.equal(found, 2);
  });

  it("returns `undefined` when nothing was found", () => {
    const found = [1, 2, 3].find((item) => item === 4);

    assert.equal(found, void 0);
  });

  it("combined with destructuring complex compares become short", () => {
    const bob = { name: "Bob" };
    const alice = { name: "Alice" };
    const found = [alice, bob].find(({ name: { length } }) => length);

    assert.equal(found, alice);
  });
});