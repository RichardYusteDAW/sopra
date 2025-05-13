// arrow functions - basics
// To do: make all tests pass, leave the asserts unchanged!
const assert = require("assert");

describe("arrow functions", () => {
  it("are shorter to write", () => {
    var func = () => { return "I am func" };

    assert.equal(func(), "I am func");
  });

  it("a single expression, without curly braces returns too", () => {
    var func = () => "I return too";

    assert.equal(func(), "I return too");
  });

  it("one parameter can be written without parens", () => {
    var func = p => p - 1;
    assert.equal(func(25), 24);
  });

  it("many params require parens", () => {
    var func = (param, param1) => param + param1;
    assert.equal(func(23, 42), 23 + 42);
  });

  it("body needs parens to return an object", () => {
    var func = () => ({
      iAm: "an object"
    });
    assert.deepEqual(func(), { iAm: "an object" });
  });
});