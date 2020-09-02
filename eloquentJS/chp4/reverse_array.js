
/*
    2 functions in this program:
    - reverseArray creates a new array which is the reverse of the 
      given array
    - reverseArrayInPLace reverses the array in place 
*/

function reverseArray(array){
    let newArray = [];
    for (element of array){
        newArray.unshift(element);
    }
    return newArray;
}

function reverseArrayInPlace(array){
    let iterations = Math.floor(array.length/2);
    let size = array.length - 1;
    for (count = 0; count < iterations; count++){
        let temp = array[size - count];
        array[size - count] = array[count];
        array[count] = temp;
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

let arrayValue1 = [1, 2, 3, 4, 5, 6, 7];
reverseArrayInPlace(arrayValue1);
console.log(arrayValue1);

