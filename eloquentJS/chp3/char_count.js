
/*
    Program which consists of 2 functions:
    - countBstakes a single argument, a string and returns B's frequency
    - countChars takes a 2nd argument and returns the char frequency.
*/

function countBs(string){
    let beanCount = 0;
    for (count = 0; count <= string.length-1; count++){
        if (string[count] == 'B'){
            beanCount++;
        }
    }
    return beanCount;
}

function countChar(string, char){
    let charCount = 0;
    for (count = 0; count <= string.length-1; count++){
        if (string[count] == char){
            charCount++;
        }
    }
    return charCount;
}

console.log(countBs("BBC BBB"));
// → 2
console.log(countChar("kakkerlak keke", "k"));
// → 4