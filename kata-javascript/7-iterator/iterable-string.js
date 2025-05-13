// iterator/iterable - string.
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("string is a built-in iterable object", () => {
  const s = "abc";

  describe("string is iterable", () => {
    it("the string`s object key `Symbol.iterator` is a function", () => {
      const isA = typeof s[Symbol.iterator];
      assert.equal(isA, "function");
    });
    it("use `Array.from()` to make an array out of any iterable", () => {
      const arr = Array.from(s);
      assert.deepEqual(arr, ["a", "b", "c"]);
    });
  });

  describe("a string`s iterator", () => {
    let iterator;
    beforeEach(() => {
      iterator = s[Symbol.iterator]();
    });

    it("has a special string representation", () => {
      const description = iterator.toString();
      assert.equal(description, "[object String Iterator]");
    });

    it("`iterator.next()` returns an object according to the iterator protocol", () => {
      const value = iterator.next();
      assert.deepEqual(value, { done: false, value: "a" });
    });

    it("the after-last call to `iterator.next()` says done=true, no more elements", () => {
      iterator.next();
      iterator.next();
      iterator.next();
      assert.equal(iterator.next().done, true);
    });
  });
});