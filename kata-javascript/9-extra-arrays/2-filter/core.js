// Returns only those numbers that are even
function onlyEven(array) {
  return array.filter((num) => num % 2 == 0);
}

// Returns only those strings with a single word (no spaces)
function onlyOneWord(array) {
  // TODO: Implement
  return array.filter((w) => !w.includes(" "));
}

// Return only the rows in the matrix that have all positive integers
function positiveRowsOnly(array) {
  // TODO: Implement
  return array.filter(e => e.every(n => n > 0));
}

// Return only those words where all the vowels are the same
function allSameVowels(array) {

  // TODO: Implement
  const isVowel = char => ['a', 'e', 'i', 'o', 'u'].includes(char);

  const checkWord = word => {
    let firstVowel = null;
    for (const char of word) {
      if (isVowel(char)) {
        if (firstVowel === null) firstVowel = char;
        else if (char !== firstVowel) return false;
      }
    }
    return firstVowel !== null;
  };

  return array.filter(checkWord);
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};