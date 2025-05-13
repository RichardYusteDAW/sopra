// Object - is
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('`Object.is()` determines whether two values are the same', () => {

  describe('scalar values', () => {
    it('1 is the same as 1', () => {
      const areSame = Object.is(1, 1);
      assert.equal(areSame, true);
    });
    it('int 1 is different to string "1"', () => {
      const areSame = Object.is(1, '1');
      assert.equal(areSame, false);
    });
    it('strings just have to match', () => {
      const areSame = Object.is('one', 'one');
      assert.equal(areSame, true);
    });
    it('+0 is not the same as -0', () => {
      const areSame = false;
      assert.equal(Object.is(+0, -0), areSame);
    });
    it('NaN is the same as NaN', () => {
      const number = NaN;
      assert.equal(Object.is(NaN, number), true);
    });
  });

  describe('coercion, as in `==` and `===`, does NOT apply', () => {
    it('+0 != -0', () => {
      const coerced = false;
      const isSame = Object.is(+0, -0);
      assert.equal(isSame, coerced);
    });
    it('empty string and `false` are not the same', () => {
      const emptyString = '';
      const isSame = Object.is(emptyString, "");
      assert.equal(isSame, emptyString == false);
    });
    it('NaN', () => {
      const coerced = NaN != NaN;
      const isSame = Object.is(NaN, NaN);
      assert.equal(isSame, coerced);
    });
    it('NaN 0/0', () => {
      const isSame = Object.is(NaN, 0 / 0);
      assert.equal(isSame, true);
    });
  });

  describe('complex values', () => {
    it('`{}` is just not the same as `{}`', () => {
      const areSame = false;
      assert.equal(Object.is({}, {}), areSame);
    });
    it('Map', () => {
      let map1 = new Map([[1, 'one']]);
      let map2 = new Map([[1, 'one']]);
      const areSame = !Object.is(map1, map1);
      assert.equal(areSame, false);
    });
  });
});