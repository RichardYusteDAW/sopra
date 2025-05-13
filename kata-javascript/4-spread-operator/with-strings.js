// spread - with-strings
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

describe('spread with strings', () => {

  it('simply spread each char of a string', () => {
    const [a, b] = [...'ab'];
    assert.equal(a, 'a');
    assert.equal(b, 'b');
  });

  it('extracts each array item', () => {
    const [a, , b] = ['1', ...'12'];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('works anywhere inside an array (must not be last)', () => {
    const letters = ['a', 'bcd', 'e', 'f'];
    assert.equal(letters.length, 4);
  });

  it('dont confuse with the rest operator', () => {
    const [...rest] = [1, 2, 3, 4, ...'5'];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });

  it('passed as function parameter', () => {
    const max = Math.max(1, 2, 3, 4, 5);
    assert.deepEqual(max, 5);
  });
});