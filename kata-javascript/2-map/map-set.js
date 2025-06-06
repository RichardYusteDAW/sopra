// Map.prototype.set()
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`Map.prototype.set` adds a new element with key and value to a Map", () => {
  it("simplest use case is `set(key, value)` and `get(key)`", () => {
    let map = new Map();
    map.set("key", "value");
    map.set();

    assert.equal(map.get("key"), "value");
  });

  it("the key can be a complex type too", () => {
    const noop = () => { };
    let map = new Map();
    map.set(noop, "the real noop");

    assert.equal(map.get(noop), "the real noop");
  });

  it("calling `set()` again with the same key replaces the value", () => {
    let map = new Map();
    map.set("key", "value");
    map.set("key", "value3");
    map.set("key", "value1");

    assert.equal(map.get("key"), "value1");
  });

  it("`set()` returns the map object, it`s chainable", () => {
    let map = new Map();
    map.set(1, "one").set(2, "two").set(3, "three");

    assert.deepEqual([...map.keys()], [1, 2, 3]);
    assert.deepEqual([...map.values()], ["one", "two", "three"]);
  });
});