// Generator - Yield Expressions
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("generator - `yield` is used to pause and resume a generator function", () => {
  function* generatorFunction() {
    yield "hello";
    yield "world";
  }

  let generator;

  beforeEach(() => {
    generator = generatorFunction();
  });

  it("converting a generator to an array resumes the generator until all values are received", () => {
    let values = Array.from(generator);
    assert.deepEqual(values, ["hello", "world"]);
  });

  describe("after the first `generator.next()` call", () => {
    it('the value is "hello"', () => {
      const { value } = generator.next();
      assert.equal(value, "hello");
    });

    it("and `done` is false", () => {
      const { done } = generator.next();
      assert.equal(done, false);
    });
  });

  describe("after the second `next()` call", () => {
    let secondItem;
    beforeEach(() => {
      generator.next();
      secondItem = generator.next();
    });

    it('`value` is "world"', () => {
      let { value } = secondItem;
      assert.equal(value, "world");
    });

    it("and `done` is still false", () => {
      const { done } = secondItem;
      assert.equal(done, false);
    });
  });

  describe("after stepping past the last element, calling `next()` that often", () => {
    it("`done` property equals true, since there is nothing more to iterator over", () => {
      generator.next();
      generator.next();
      let { done } = generator.next();

      assert.equal(done, true);
    });
  });
});