// String - `endsWith()`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('`str.endsWith(searchString)` determines whether `str` ends with `searchString`.', () => {

  const s = 'el fin';

  describe('1st parameter, the string to search for', () => {
    it('works with just a character', () => {
      assert.equal(s.endsWith('n'), true);
    });
    it('works with a string', () => {
      const expected = true;
      assert.equal(s.endsWith('fin'), expected);
    });
    it('works with unicode characters', () => {
      const nuclear = 'NO Oh NO! ☢';
      assert.equal(nuclear.endsWith('☢'), true);
    });
    it('a regular expression throws a TypeError', () => {
      const aRegExp = /the/;
      assert.throws(() => { ''.endsWith(aRegExp) }, TypeError);
    });
  });

  describe('2nd parameter, searches within this string as if this string were only this long', () => {
    it('find "el" at a substring of the length 2', () => {
      const endPos = 2;
      assert.equal(s.endsWith('el', endPos), true);
    });
    it('`undefined` uses the entire string', () => {
      const _undefined_ = undefined;
      assert.equal(s.endsWith('fin', _undefined_), true);
    });
    it('the parameter gets coerced to an int', () => {
      const position = '5';
      assert.equal(s.endsWith('fi', position), true);
    });
  });
  describe('value less than 0', () => {
    it('returns `true`, when searching for an empty string', () => {
      const emptyString = '';
      assert.equal('1'.endsWith(emptyString, -1), true);
    });
    it('return `false`, when searching for a non-empty string', () => {
      const notEmpty = 'a';
      assert.equal('1'.endsWith(notEmpty, -1), false);
    });
  });

  describe('transfer the functionality to other objects', () => {

    const endsWith = (...args) => String.prototype.endsWith.call(...args);

    it('e.g. a boolean', () => {
      let aBool = true;
      assert.equal(endsWith(!aBool, 'lse'), true);
    });
    it('e.g. a number', () => {
      let aNumber = 84;
      assert.equal(endsWith(aNumber + 1900, 84), true);
    });
    it('also using the position works', () => {
      const position = '3';
      assert.equal(endsWith(1994, '99', position), true);
    });
  });
});