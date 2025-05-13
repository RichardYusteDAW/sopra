// Check to see if all elements in an array
// are even numbers.
function allEven(input) {
  // TODO: Implement
  return input.every(num => num % 2 === 0);
}

// Check to see if all elements in an array
// are of the same type.
function allSameType(input) {
  // TODO: Implement
  return input.every((item, index, arr) => typeof item === typeof arr[0]);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.
function positiveMatrix(input) {
  // TODO: Implement
  return input.every(arr => arr.every(num => num > 0));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.
function allSameVowels(input) {
  // TODO: Implement
  return input.every(word => {
    if (typeof word !== 'string') return false;

    let firstVowel = null;
    for (let char of word) {
      if ("aeiou".includes(char)) {
        if (firstVowel === null) firstVowel = char;
        else if (char !== firstVowel) return false;
      }
    }
    return true;
  });
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
