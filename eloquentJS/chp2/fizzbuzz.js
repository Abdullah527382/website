

/* 
    A program which prints numbers from 1 to 100
    except if a number is divisible by 3 it prints "Fizz" 
    and if a number is divisible by 5, it prints "Buzz"

    If numbers are divisible by both 3 and 5, print FizzBuzz

*/
// Initialise the counter
let counter = 0;
// Loop start
while (counter <= 100){
    // If a number divisible by both 3 and 5: FizzBuzz
    if (counter % 5 == 0 && counter % 3 == 0){
        console.log("FizzBuzz");
    // If a number divisible by 5: Buzz
    } else if (counter % 5 == 0){
        console.log("Buzz");
    // If a number divisible by 3: Fizz
    } else if (counter % 3 == 0){
        console.log("Fizz")
    // Otherwise just print the number
    } else {
        console.log(counter);
    }
    // Increment counter
    counter++;
}