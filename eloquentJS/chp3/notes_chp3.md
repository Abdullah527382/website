## Chapter 3: Functions
____

#### Defining a function

A *function* definition is a regular binding where the value of the binding is a function. 

The below function defines *square* to refer to a function that produces the square of a given number 

```javascript 
const square = function(x) {
  return x * x;
};

console.log(square(12));
// → 144
```

Function is created with keyword *function*, they have a set of *parameters* (in this case, only x) and a *body* which contains statements to be executed during function calls. 

Below are examples of functions with varying amount of parameters:
```javascript
const makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// → 1024
```
A return statement determines the value the function returns
__Parameters__ to a function behave like regular *bindings*, but their initial values are given by the caller of the function, not the code in the function itself

#### Bindings and scope

Each binding has a scope, which is the part of the program in which the binding is visible. For bindings defined outside of any function or block, the scope is the whole program—you can refer to such bindings wherever you want. These are called *global*.

Each function acts like a *little world*, a local environment for bindings declared in the function parameters or declared inside the function. We should also consider locality of bindings to the blocks they are created in (example below):
```javascript
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
  // → 60
}
// y is not visible here
console.log(x + z);
// → 40
```
Bindings created with __var__ keyword are visible throughout the whole function. Remember to care when multiple bindings have same name (example below).
```javascript
const halve = function(n) {
  return n / 2;
};

let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
```

#### Nested scope:

Multiple degrees of locality can be created when considering blocks/functions within other functions/blocks. See the code below 

```javascript
const hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
```
The code inside the ingredient function can see the *factor* binding from the outer function. 

#### Functions as values:
A function *binding* usually simply acts as a name for a specific piece of the program. Such a binding is defined once and never changed. This makes it easy to confuse the function and its name.

Function values can imitate all typical value attributes, e.g.  It is possible to store a function value in a new binding, pass it as an argument to a function, and so on.
```javascript
let launchMissiles = function() {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function() {/* do nothing */};
}
```

#### Declaration notation:

A shorter way:
```js
function square(x) {
  return x * x;
}
```
A small subtlety, the below code will work even though the function comes after its call. 
```js
console.log("The future says:", future());

function future() {
  return "You'll never have flying cars";
}
```

#### Arrow functions:
The third notation uses an arrow (=>), it comes *after* the list of parameters and is followed by the function's body. Example: 
```js
const power = (base, exponent) => {
    ... 
};
```
If there is a single *parameter* name, you may omit the braces around it, similarly if the body is a single expression. Also, when a function has no parameters, the list is an empty set of parameters. The below statements both do the same thing.
```js
const square1 = (x) => { return x * x; };
const square2 = x => x * x;
// No parameters
const horn = () => {
  console.log("Toot");
};
```

#### The call stack:
Every time a function is called, the computer stores this *"current context"* on top of the __call stack__. When a function returns, it removes the top context from the stack and uses that context to continue execution. 

Storing this stack requires space in the computer's memory, as it grows too big, the computer will fail with a message like *"out of stack space"*. The following code illustrates a *"would be infinite recursion"* if the computer had an infinite stack. 
```js
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??
```

#### Optional arguments:

The following code is allowed and executes without any problem:
```js
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// → 16
```
JavaScript is extremely broad-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored. If you pass too few, the *missing parameters* get assigned the value __undefined__.

If you write an = operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is not given.
*Example* below
```js
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64
```

#### Closure 

What happens to local bindings when the *function call* that created them is no longer active? 

The following code shows an example of this: 
```js
function wrapValue(n) {
  let local = n;
  return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
```
__NOTE__: The explicit local binding from the wrapValue example isn’t really needed since a parameter is itself a local binding.

It defines a function, *wrapValue*, that creates a local *binding*. It then returns a function that accesses and returns this local binding.

This is allowed and works as you’d hope—both instances of the binding can still be accessed. This situation is a good demonstration of the fact that local bindings are created anew for every call.

This feature—being able to reference a specific instance of a local binding in an enclosing scope—is called closure.

```js
function multiplier(factor) {
  return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// → 10
```

#### Recursion:

A function may call itself (recursive), as long as it doesn't overflow the stack. Below is shown an alternative representation of the power function.
```js
function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3));
// → 8
```
This implementation has one problem: in typical JavaScript implementations, it’s about __three__ times slower than the *looping* version.

The looping version is still fairly simple and easy to read thus there is no reason to replace it with the recursive version.

In other cases often, though, a program deals with such *complex* concepts that giving up some efficiency in order to make the program more straightforward is helpful.

Below is an example of a __recursive function__ which finds a sequence of additions and multiplications which produce a target number. 
```js
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) ||
             find(current * 3, `(${history} * 3)`);
    }
  }
  return find(1, "1");
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)
```

Below are calls to find that are made when searching for solution to 13.
```js
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
```
The indentation indicates the depth of the call stack. 

#### Growing functions

There are two ways for functions to be introduced into programs. 
1. You find yourself writing code multiple times, for convenience you take the repeated functionality and put it into a function
2. The 2nd way is you find some functionality in your program which sounds like it deserve its own function.

 Whenever we "*grow*" our functions to make them smarter and more versatile i.e. to handle more parameters, different characters, num types, etc. We must make sure the "*cleverness*" is necessary. 

#### Functions and side effects
Functions can be divided into those which return a value and those who are called for their *side effects* (e.g. prints a line). 
* *Functions* that create values are easier to combine than those that directly perform side effects.
* *A pure function* doesn't perform these side effects neither does it rely on side effects from other code—for e.g. global bindings whose value might change. 
* *Non pure functions* are still useful in certain contexts, for instance, there'd be no way to write a pure version of *console.log*. Computing speed in itself can be a reaso to avoid purity. 

#### Summary
This chapter taught me ways to write my own functions, using the function keyword and arrow symbol. 
```js
// Define f to hold a function value
const f = function(a) {
  console.log(a + 2);
};

// Declare g to be a function
function g(a, b) {
  return a * b * 3.5;
}

// A less verbose function value
let h = a => a % 3;
```