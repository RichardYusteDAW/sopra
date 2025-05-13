// Generator - iterator
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("a generator returns an iterable object", () => {
  function* generatorFunction() {
    yield 1;
    yield 2;
  }

  let generator;

  beforeEach(() => {
    generator = generatorFunction();
  });

  it("a generator returns an object", () => {
    const typeOfTheGenerator = "object";
    assert.equal(typeof generator, typeOfTheGenerator);
  });

  it("a generator object has a key `Symbol.iterator`", () => {
    const key = Symbol.iterator;
    assert.equal(key in generator, true);
  });

  it("the `Symbol.iterator` is a function", () => {
    const theType = typeof generator[Symbol.iterator];
    assert.equal(theType, "function");
  });

  it("can be looped with `for-of`, which expects an iterable", () => {
    const iterateForOf = () => {
      for (let value of generator) {
        // no statements needed
      }
    }
    assert.doesNotThrow(iterateForOf);
  });
});