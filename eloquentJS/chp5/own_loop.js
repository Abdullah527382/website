    
/*
    Write a higher-order function that provides something like a for loop
    - Takes a value, test function, update function and a body
    - Each iteration, it runs the test func, if false then it stops
    - You can use a loop in the actual function
*/

// Your code here.
function loop(start, test, update, action){
    // Initialise start
    let i = start;
    // While test() is true
    while (test(i)){
        // Do the action and update the value
        action(i);
        i = update(i);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

loop(1, n => n < 10, n => n + 1, console.log);
// 1 ... 10