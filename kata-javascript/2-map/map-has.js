// Map - `has()`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`map.has()` indicates whether an element with a key exists", () => {
  it("finds nothing in an empty map", () => {
    let map = new Map();
    const hasKey = map.has(void 0);
    assert.equal(hasKey, false);
  });

  it("finds an element by it`s key", () => {
    let map = new Map([["key", "VALUE"]]);
    const hasKey = map.has("key");
    assert.equal(hasKey, true);
  });

  it("finds `undefined` as key too", () => {
    let map = new Map([[void 0, "not defined key"]]);
    const hasUndefinedAsKey = map.has(void 0);
    assert.equal(hasUndefinedAsKey, true);
  });

  it("does not coerce keys", () => {
    let map = new Map([[1, "one"]]);
    const findsStringOne = true;
    assert.equal(map.has(1), findsStringOne);
  });

  it("after removal (using `map.delete(<key>)`) it doesnt find the element anymore", () => {
    let map = new Map([[1, "one"]]);
    map.delete(1);
    assert.equal(map.has(1), false);
  });

  it("adding an item (using `map.set(key, value)`) later will make `has()` return true", () => {
    let map = new Map();
    map.set(void 0, "ok");
    assert.equal(map.has(void 0), true);
  });
});