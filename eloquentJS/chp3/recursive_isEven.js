
/*
    Program which consists of a recursive function isEven() which takes
    an integer and returns whether the number is 
    true for even else false
*/

function isEven(N){
    // Base cases:
    if (N == 0) return true;
    else if (N == 1) return false;
    else {
        // Accomodate for both negative and positive integers
        return N > 0 ? isEven(N - 2) : isEven(N + 2);
    }
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-2));
// → ??