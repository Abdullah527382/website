
/*
    Implement the 'every' method as a function that takes an array and
    a predicate function as parameters. Write 1 using a loop and another
    using the 'some' method.
    - The every method returns true when the give function returns true for
    EVERY element in the array.
    - Similar to the 'some' method which can be thought of the || operator 
    acting on arrays whilst 'every' being the && on arrays.
*/
// Loop version 
function every(array, test){
    // For every number in the array
    for (num of array){
        // Apply the test, if its false return false
        if (!test(num)) return false;
    }
    // Return true otherwise
    return true;
} 

// Some version
function every(array, test){
    // If some array value doesn't suffice test, return false
    if (array.some((a) => !test(a))) return false;
    // Return true otherwise 
    return true;
}

console.log(every([1, 3, 5], n => n < 6));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true