// String - `repeat()`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('`str.repeat(x)` appends `x` copies of `str` to each other and returns it', () => {

  describe('pass the count to `str.repeat(count)`', () => {
    it('for `1` the string stays the same', () => {
      const what = 'one'.repeat(1);
      assert.equal(what, 'one');
    });
    it('for `3` the string `x` becomes `xxx`', () => {
      const actual = 'x'.repeat(3);
      assert.equal(actual, 'xxx');
    });
    it('for `0` an empty string is returned', () => {
      const dontRepeat = 0;
      assert.equal('shrink'.repeat(dontRepeat), '');
    });
    it('the count is not an int, such as "3", it gets coerced to an int', () => {
      const repeated = 'three'.repeat('3');
      assert.equal(repeated, 'threethreethree');
    });
  });

  describe('throws an error for', () => {
    it('a count of <0', () => {
      const belowZero = -1;
      assert.throws(() => { ''.repeat(belowZero); }, RangeError);
    });
    it('a count of +Infinity', () => {
      let infinity = Infinity;
      assert.throws(() => { ''.repeat(infinity); }, RangeError);
    });
  });

  describe('accepts everything that can be coerced to a string', () => {
    it('e.g. a boolean', () => {
      let aBool = false;
      assert.equal(String.prototype.repeat.call(aBool, 2), 'falsefalse');
    });
    it('e.g. a number', () => {
      let aNumber = 1;
      assert.equal(String.prototype.repeat.call(aNumber, 2), '11');
    });
  });

  describe('for my own (string) class', () => {
    it('calls `toString()` to make it a string', () => {
      class MyString { toString() { return 'my string'; } }

      const expectedString = 'my string';

      assert.equal(String(new MyString()).repeat(1), expectedString);
    });
    it('`toString()` is only called once', () => {
      let counter = 1;
      class X {
        toString() {
          return counter++;
        }
      }

      let repeated = String(new X()).repeat(2);

      assert.equal(repeated, '11');
    });
  });
});