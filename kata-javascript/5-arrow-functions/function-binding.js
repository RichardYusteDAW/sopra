// arrow functions - binding
// To do: make all tests pass, leave the asserts unchanged!
const assert = require("assert");

class LexicallyBound {
  getFunction() {
    return () => {
      return this;
    };
  }

  getArgumentsFunction() {
    return () => {
      return arguments;
    };
  }
}

describe("arrow functions have lexical `this`, no dynamic `this`", () => {
  it("bound at definition time, use `=>` ", () => {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();

    assert.strictEqual(fn(), bound);
  });

  it("can NOT bind a different context", () => {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    var anotherObj = {};
    var expected = bound;

    assert.strictEqual(fn.call(anotherObj), expected);
  });

  it("`arguments` doesnt work inside arrow functions", () => {
    var bound = new LexicallyBound();
    var fn = bound.getArgumentsFunction();

    assert.equal(fn(1, 2).length, 0);
  });
});