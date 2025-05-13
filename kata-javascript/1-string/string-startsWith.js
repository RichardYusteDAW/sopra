// String - `startsWith()`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('`str.startsWith(searchString)` determines whether `str` begins with `searchString`.', () => {

  const s = 'the string s';

  describe('1st parameter, the string to search for', () => {
    it('works with just a character', () => {
      const actual = s.startsWith('t');
      assert.equal(actual, true);
    });
    it('works with a string', () => {
      const expected = true;
      assert.equal(s.startsWith('the'), expected);
    });
    it('works with unicode characters', () => {
      const nuclear = '☢ NO  NO';
      assert.equal(nuclear.startsWith('☢'), true);
    });
    it('a regular expression throws a TypeError', () => {
      const aRegExp = /the/;
      assert.throws(() => { ''.startsWith(aRegExp) }, TypeError);
    });
  });

  describe('2nd parameter, the position where to start searching from', () => {
    it('find "str" at position 4', () => {
      const position = 4;
      assert.equal(s.startsWith('str', position), true);
    });
    it('`undefined` is the same as 0', () => {
      const _undefined_ = undefined;
      assert.equal(s.startsWith('the', _undefined_), true);
    });
    it('the parameter gets coerced to an int', () => {
      const position = '4';
      assert.equal(s.startsWith('str', position), true);
    });
    it('a value larger than the string`s length, returns false', () => {
      const expected = false;
      assert.equal(s.startsWith(' ', s.length + 1), expected);
    });
  });

  describe('transfer the functionality to other objects', () => {

    const startsWith = (...args) => String.prototype.startsWith.call(...args);

    it('e.g. a boolean', () => {
      let aBool = true;
      assert.equal(startsWith(!aBool, 'false'), true);
    });
    it('e.g. a number', () => {
      let aNumber = 1900;
      assert.equal(startsWith(aNumber + 84, '1984'), true);
    });
    it('also using the position works', () => {
      const position = 1;
      assert.equal(startsWith(1994, '99', position), true);
    });
  });
});