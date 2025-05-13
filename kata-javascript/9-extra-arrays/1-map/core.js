// Multiplies all elements in an array by 10

function multiplyBy10(array) {
  // TODO: Implement
  return array.map(e => e * 10)
}

// Shifts items in an array to the right by one

function shiftRight(array) {
  const newArray = [];
  array.map((e, i) => newArray[i + 1] = e);
  const last = newArray.pop();
  newArray[0] = last;

  return newArray;
}

// Removes any non-vowel character from words in an array

function onlyVowels(array) {
  return array.map(e => e.replace(/[^aeiou]/g, ''))
}

// Doubles the numbers in the matrix, maintaining the same structure

function doubleMatrix(array) {
  // TODO: Implement
  return array.map(e => e.map(n => n * 2))
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};