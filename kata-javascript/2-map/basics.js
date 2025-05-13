// Map - basics
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("`Map` is a key/value map", () => {
  it("`Map` is a new global constructor function", () => {
    assert.equal(typeof Map, "function");
  });

  it("provides `new Map().set()` to add key+value pair, `get()` to read it by key", () => {
    let map = new Map();
    map.set("key", "value");
    const value = map.get("key");

    assert.equal(value, "value");
  });

  it("`has()` tells if map has the given key", () => {
    let map = new Map();
    map.set("hazz", true);
    const hasIt = map.get("hazz");

    assert.equal(hasIt, true);
  });

  it("a map is iterable", () => {
    let map = new Map();
    map.set("1", "one");
    map.set("2", "two");
    const mapAsArray = Array.from(map); // hint: kata #29 http://tddbin.com/#?kata=es6/language/array-api/from

    assert.deepEqual(mapAsArray, [
      ["1", "one"],
      ["2", "two"],
    ]);
  });

  it("complex types can be keys", () => {
    const obj = { x: 1 };
    const otherObj = { x: 1 };
    let map = new Map();
    map.set(obj, "");
    //map.set(otherObj, "");

    assert.equal(map.has(otherObj), false);
  });
});