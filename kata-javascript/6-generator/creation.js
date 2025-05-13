// Generator - creation
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe("generator can be created in multiple ways", () => {
  it("the most common way is by adding `*` after `function`", () => {
    function* g() { }
    assertIsGenerator(g());
  });

  it("as a function expression, by adding a `*` after `function`", () => {
    let g = function* () { };
    assertIsGenerator(g());
  });

  it("inside an object by prefixing the function name with `*`", () => {
    let obj = {
      *g() { },
    };
    assertIsGenerator(obj.g());
  });

  it("computed generator names, are just prefixed with a `*`", () => {
    const generatorName = "g";
    let obj = {
      *[generatorName]() { },
    };
    assertIsGenerator(obj.g());
  });

  it("inside a class the same way", () => {
    const generatorName = "g";
    class Klazz {
      *[generatorName]() { }
    }
    assertIsGenerator(new Klazz().g());
  });

  const assertIsGenerator = (gen) => {
    const toStringed = "" + gen;
    assert.equal(toStringed, "[object Generator]");
  }
});
