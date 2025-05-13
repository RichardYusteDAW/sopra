// String - `includes()`
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('`string.includes()` finds string within another string', () => {

  describe('find a single character', () => {
    it('in a three char string', () => {
      const searchString = 'x';
      assert.equal('xyz'.includes(searchString), true);
    });
    it('reports false if character was not found', () => {
      const expected = false;
      assert.equal('xyz'.includes('abc'), expected);
    });
  });

  describe('find a string', () => {
    it('that matches exactly', () => {
      const findSome = findMe => 'xyz'.includes(findMe);
      assert.equal(findSome('xyz'), true);
    });
  });

  describe('search for an empty string, is always true', () => {
    it('in an empty string', () => {
      const emptyString = '';
      assert.equal(''.includes(emptyString), true);
    });
    it('in `abc`', () => {
      const actual = ''.includes('');
      assert.equal(actual, true);
    });
  });

  describe('special/corner cases', () => {
    it('search for `undefined` in a string fails', () => {
      const findInAbc = (what) => 'abc'.includes(what);
      assert.equal(findInAbc(void 0), false);
    });
    it('searches case-sensitive', () => {
      const findInAbc = (what) => 'abc'.includes(what);
      assert.equal(findInAbc('A'), false);
    });
    it('must NOT be a regular expression', () => {
      const regExp = /''/;
      assert.throws(() => { ''.includes(regExp) });
    });
    describe('coerces the searched "thing" into a string', () => {
      it('e.g. from a number', () => {
        const actual = '1234'.includes(4);
        assert.equal(actual, true);
      });
      it('e.g. from an array', () => {
        const actual = '[1, 2, 3]'.includes(1);
        assert.equal(actual, true);
      });
      it('e.g. from an object, with a `toString()` method', () => {
        const objWithToString = { toString: () => '2' };
        assert.equal('123'.includes(objWithToString), true);
      });
    });
  });

  describe('takes a position from where to start searching', () => {
    it('does not find `a` after position 1 in `abc`', () => {
      const position = 1;
      assert.equal('abc'.includes('a', position), false);
    });
    it('even the position gets coerced', () => {
      const pos = '2';
      const findAtPosition = () => 'xyz'.includes('z', pos);
      assert.equal(findAtPosition(), true);
    });
    describe('invalid positions get converted to 0', () => {
      it('e.g. `undefined`', () => {
        const findAtPosition = (pos = 0) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(void 0), true);
      });
      it('negative numbers', () => {
        const findAtPosition = (pos) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(-2), true);
      });
      it('NaN', () => {
        const findAtPosition = (pos) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(NaN), true);
      });
    });
  });
});