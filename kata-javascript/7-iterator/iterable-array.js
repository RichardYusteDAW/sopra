// iterator/iterable - array.
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("array is a built-in iterable object", () => {
  const arr = ["a", "B", "see"];

  describe("the iterator", () => {
    it("an array has an iterator, which is a function", () => {
      const iterator = arr[Symbol.iterator];
      const theType = typeof iterator;
      const expected = "function";

      assert.equal(theType, expected);
    });

    it("can be looped with `for-of`, which expects an iterable", () => {
      let count = 0;
      for (let value of arr) {
        count++;
      }

      assert.equal(count, arr.length);
    });
  });

  describe("the iterator protocol", () => {
    it("calling `next()` on an iterator returns an object according to the iterator protocol", () => {
      const iterator = arr[Symbol.iterator]();
      const firstItem = iterator.next();

      assert.deepEqual(firstItem, { done: false, value: "a" });
    });

    it("the after-last element has done=true", () => {
      const arr = [];
      const iterator = arr[Symbol.iterator]();
      const afterLast = iterator.next();

      assert.deepEqual(afterLast, { done: true, value: void 0 });
    });
  });
});