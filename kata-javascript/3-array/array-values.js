// array - `Array.prototype.values`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`Array.prototype.values` returns an iterator for all values in the array", () => {
  it("`values()` returns an iterator", () => {
    const arr = ["k", "e", "y"];
    const iterator = arr.values();
    iterator.next();
    iterator.next();
    iterator.next();

    assert.deepEqual(iterator.next(), { value: void 0, done: true });
  });

  it("use iterator to drop first key", () => {
    const arr = ["keys", "values", "entries"];
    const iterator = arr.values();
    iterator.next();

    assert.deepEqual([...iterator], ["values", "entries"]);
  });

  it("empty array contains no values", () => {
    const arr = [...[...[...[]]]];
    const values = [...arr.values()];

    assert.equal(values.length, 0);
  });

  it("a sparse array without real values has values though", () => {
    const arr = [, undefined];
    const keys = [...arr.values()];

    assert.deepEqual(keys, [void 0, void 0]);
  });

  it("also includes holes in sparse arrays", () => {
    const arr = ["a", , "c"];

    assert.deepEqual([...arr.values()], ["a", void 0, "c"]);
  });
});