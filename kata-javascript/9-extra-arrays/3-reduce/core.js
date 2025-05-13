// Sum all the numbers in the array
function sum(array) {
  // TODO: Implement
  return array.reduce((acc, num) => acc + num, 0);
}

// Return the product of all items in the matrix
function productAll(array) {
  // TODO: Implement
  return array.reduce((acc, array2) => {
    return acc * array2.reduce((acc2, num) => acc2 * num, 1);
  }, 1);
}

// Turns an array of arrays into an object
function objectify(array) {
  // TODO: Implement
  return array.reduce((acc, array2) => {
    acc[array2[0]] = array2[1];
    return acc;
  }, {});
}

// Return a fortune like sentence with lucky numbers
function luckyNumbers(array) {
  // TODO: Implement
  return array.reduce((acc, num, index) => {
    if (index === array.length - 1) return acc + 'and ' + num;
    else return acc + num + ', ';
  }, 'Your lucky numbers are: ');
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
