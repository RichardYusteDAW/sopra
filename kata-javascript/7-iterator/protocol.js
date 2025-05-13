// iterator - custom.
// Iterable is a protocol, when implemented allows objects
// to customize their iteration behavior, such as what values are looped over in a for..of construct.
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!
const assert = require("assert");

describe("A simple iterable without items inside, implementing the right protocol", () => {
  const iteratorFunction = () => ({
    next: () => ({ done: true })
  });

  describe("the `iteratorFunction` needs to comply to the iterator protocol", () => {
    it("must return an object", () => {
      assert.equal(typeof iteratorFunction(), "object");
    });
    it("the object must have a function assigned to a key `next`", () => {
      assert.equal(typeof iteratorFunction().next, "function");
    });
    it("calling `next()` must return an object with `{done: true}`", () => {
      assert.deepEqual(iteratorFunction().next(), { done: true });
    });
  });

  let iterable = {
    [Symbol.iterator]: iteratorFunction
  };
  beforeEach(() => {
    iterable;
  });

  describe("the iterable", () => {
    it("must be an object", () => {
      assert.equal(typeof iterable, "object");
    });
    it("must have the iterator function assigned to the key `Symbol.iterator`", () => {
      assert.equal(iterable[Symbol.iterator], iteratorFunction);
    });
  });

  describe("using the iterable", () => {
    it("it contains no values", () => {
      let values = "";
      for (let value of iterable) {
        values += value;
      }
      assert.equal(values, "");
    });

    it("has no `.length` property", () => {
      const hasLengthProperty = iterable.hasOwnProperty("length");
      assert.equal(hasLengthProperty, false);
    });

    describe("can be converted to an array", () => {
      it("using `Array.from()`", () => {
        const arr = Array.from(iterable);
        assert.equal(Array.isArray(arr), true);
      });

      it("where `.length` is still 0", () => {
        const arr = Array.from(iterable);
        const length = arr.length;
        assert.equal(length, 0);
      });
    });
  });
});