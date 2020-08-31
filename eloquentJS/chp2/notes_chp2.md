
##Chapter 2: Program Structure
____

#### Expressions and statements
A fragment of code that produces a value is called an *expression*.
If an expression corresponds to a sentence fragment, a JavaScript *statement* corresponds to a full sentence. A program is a list of statements.

Example of a simple __program__:
```javascript 
1;
!false;
```
It is a usless program but as long as it has changed the internal state of the machine in a way that it will affect the statements coming after it, it counts.

#### Bindings
JavaScript provides a thing called a binding, or variable:
```javascript 
let caught = 5 * 5;
```
*let* indicates that this sentence is going to define a binding. After it has been defined, its name can be used as an expression e.g.
```javascript 
let ten = 10;
console.log(ten * ten);
// → 100
```
The = *operator* can be used at any time on existing bindings to disconnect them from their current value and have them point to a new one.

```javascript 
let mood = "light";
console.log(mood);
// → light
mood = "dark";
console.log(mood);
// → dark
```
A single let statement can define multiple *bindings*, seperated by commas:
```javascript
let one = 1, two = 2;
console.log(one + two);
// → 3
```

The words *var and const* can also be used to create bindings, in a way similar to let.
*var* will barely be used in this book because of confusing properties it comes with. The word *const* points at the same value forever

#### Binding names

These can be any words __except__ keyword (words with special meaning), these are shown below:
```
break case catch class const continue debugger default
delete do else enum export extends false finally for
function if implements import interface in instanceof let
new package private protected public return static super
switch this throw true try typeof var void while with yield
```

#### The environment
The collection of bindings and their values that exist at a given time is called the *environment*. 

#### Functions
A lot of the values provided in the default *environment* have the type function. A function is a piece of program wrapped in a value. Executing a function is called *invoking, calling, or applying it*. Values given to functions are called *arguments*. 

#### Return values:
When a function produces a value, it is said to return that value.For example, the function *Math.max* takes any amount of number arguments and gives back the greatest
```javascript
console.log(Math.max(2, 4));
// → 4
```
Anything that produces a value is an expression in JavaScript, which means function calls can be used within larger expressions
Here a call to __Math.min__, is used as part of a plus expression
```javascript
console.log(Math.min(2, 4) + 100);
// → 102
```

#### Conditional execution
Some programs would want to take a branch based on the situation at hand rather than a straight road program

![Branch](https://eloquentjavascript.net/img/controlflow-if.svg)
This conditional execution is created with the *if statement* in JS. 
One-liner if statement in JS:
```javascript
if (1 + 1 == 2) console.log("It's true");
// → It's true
```
You can also chain if/else if/else statements together if you have more paths to choose from e.g.

```javascript
let num = Number(prompt("Pick a number"));

if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
}
```
The *schema* for this program looks like this
![schema_chain](https://eloquentjavascript.net/img/controlflow-nested-if.svg)

#### Loops
###### While and do loops
A way to run a piece of code multiple times. This form of control flow is called a loop. 
![Loop](https://eloquentjavascript.net/img/controlflow-loop.svg)

We can now write a program that calculates and shows the value of 2^10

```javascript
let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);
// → 1024
```
We use two *bindings*: one to keep track of our result and one to count how often we have multiplied this result by 2, the loop tests whether the second binding has reached 10 yet, if not updates both bindings. 

A do loop is similar to a while loop except it always executes once and it starts reflecting whether it should stop only after the __first execution__. Example below will keep prompting till it receives an empty string.

```javascript
let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);
```

###### For loops
A slightly shorter and more comprehensive form of the while loop, the for loops: 
```javascript
for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
}
// → 0
// → 2
//   … etc.
```
###### Breaking out of for loops
There is a special statement called __break__ that has the effect of immediately jumping out of the enclosing loop. Example shown below 
```javascript 
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// → 21
```
- Illustrates the __break__ statement
- It finds the first number that is both greater than or equal to 20 and divisible by 7.
- Uses remainder operator
- The for statement doesn't indicate end of loop rather the if statement, if executed, will break the loop otherwise *infinite loop*

The *continue* keyword is similar to break but when it is encountered in a loop, control jumps out of the body and continues with the loop's next *iteration*. 
___