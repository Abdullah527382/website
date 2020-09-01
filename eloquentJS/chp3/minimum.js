
/*
    Program which consists of a function that takes 2 parameters 
    and returns the minimum of the two
*/

function min(a, b){
    return (a <= b ? a : b);
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
console.log(min(10, 10));
// -> 10

