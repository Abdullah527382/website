
/*
    A program which uses the reduce method in combination with the concat method
    to flatten an array of arrays into a single array present with all values from '
    all arrays
*/

let arrays = [[1, 2, 3], [4, 5], [6], [9.9, 3.14], ["hello", "mr", "bush"]];
console.log(arrays.reduce((arr1, arr2) => {
    return arr1.concat(arr2);
}))
// → [1, 2, 3, 4, 5, 6, ... 'bush']