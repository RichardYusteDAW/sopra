// array - `Array.from` static method
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");
const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.document = dom.window.document;

describe("`Array.from` converts an array-like object or list into an Array", () => {
  const arrayLike = { 0: "one", 1: "two", length: 2 };

  it("call `Array.from` with an array-like object", () => {
    const arr = Array.from(arrayLike);

    assert.deepEqual(arr, ["one", "two"]);
  });

  it("a DOM node`s classList object can be converted", () => {
    document.body.classList.add("some");
    document.body.classList.add("other");
    const classList = Array.from(document.body.classList);

    assert.equal("" + classList, "" + ["some", "other"]);
  });

  it("convert a NodeList to an Array and `filter()` works on it", () => {
    const nodeList = document.querySelectorAll("body");
    const bodies = Array.from(nodeList).filter((node) => node === document.body);

    assert.deepEqual(bodies, [document.body]);
  });

  describe("custom conversion using a map function as second param", () => {
    it("we can modify the value before putting it in the array", () => {
      const arr = Array.from(arrayLike, (value) => value.toUpperCase());
      assert.deepEqual(arr, ["ONE", "TWO"]);
    });

    it("and we also get the object`s key as second parameter", () => {
      const arr = Array.from(arrayLike, (value, key) => `${key}=${value}`);
      assert.deepEqual(arr, ["0=one", "1=two"]);
    });
  });
});