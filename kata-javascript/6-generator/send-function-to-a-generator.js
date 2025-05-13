// Generator - Send function to a generator
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("pass a function to a generator", () => {
  it("the generator can receive a function as a value", () => {
    let fn = () => { };
    function* generatorFunction() {
      assert.equal(yield null, fn); // remember, don't touch this line
    }
    let iterator = generatorFunction();
    iterator.next();
    iterator.next(fn);
  });

  it("pass a function to the iterator, which calls it", () => {
    function* generatorFunction() {
      yield (yield 1)();
    }
    var iterator = generatorFunction();
    var iteratedOver = [iterator.next().value, iterator.next(() => 2).value];
    assert.deepEqual([1, 2], iteratedOver);
  });

  it("nesting yielded function calls", () => {
    function* generatorFunction() {
      yield yield (yield 1)();
    }
    var iterator = generatorFunction();
    var iteratedOver = [iterator.next().value, iterator.next(() => 2).value, iterator.next(3).value];

    assert.deepEqual([1, 2, 3], iteratedOver);
  });
});