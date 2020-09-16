---

## Chapter 8: Bugs And Errors

#### Language:

JavaScript’s looseness is a hindrance. Its concept of bindings and properties is vague enough that it will rarely catch typos before actually running the program.

Often, your nonsense computation will merely produce NaN (not a number) or an undefined value, while the program happily continues, convinced that it’s doing something meaningful.

The process of finding mistakes—bugs—in programs is called debugging.

#### Strict Mode:

JavaScript can be made a little stricter by enabling strict mode. This is done by putting the string "use strict" at the top of a file or a function body.

Consider some examples:

- Normally when you forget to put let in front of your binding, JS quietly creates a global binding and uses that. In strict mode however, an error is reported instead - This is quite helpful.
- Another change in strict mode is with the _this_ binding, in strict mode - it hols the value; undefined (in functions that are not called as methods) whereas outside of strict mode, _this_ refers to the global scope object. So if you accidentally call a method/constructor incorrectly in strict mode, JS will produce an error as soon as it tries to read something from _this_ rather than writing to the global scope. Example below:

```js
// Constructor function call without "new" keyword --> it's "this" will not refer to a newly constructed object:
function Person(name) {
  this.name = name;
}
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
```

This call to person succeeded because JS created a global binding - `name`. This is different in strict mode:

```js
"use strict";
function Person(name) {
  this.name = name;
}
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined
```

In short, putting "use strict" at the top of your program rarely hurts and might help you spot a problem.

#### Types:

JavaScript only rehards types during the running of the program and even then often tries to implicitly convert values to the type it expects.

Many mistakes come from being confused about the kind of value that goes into or comes out of a function, this is why types provide a useful framework for talking about programs.

When the types of a program are known, it is possible for the computer to check them for you, pointing out mistakes before the program is run. There are several JavaScript dialects that add types to the language and check them. The most popular one is called **TypeScript**.

#### Testing:

If the language itself is no good in helping us identify mistakes, we'll have to find them the hard way - testing. A repetitive task such as testing should be done in an automated fashion - write programs which test another program.

Tests usually take the form of little labeled programs that verify some aspect of your code. For example, a set of tests for the (standard, probably already tested by someone else) toUpperCase method might look like this:

```js
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});
```

We still would rather avoid this repetitiveness by using **test runners** - Pieces of software which help you build and run _test suites_ by providing a language suited to expressing tests and by inputting informative info when a test fails.

#### Debugging

Once you notice there is something wrong with your program because it misbehaves or produces errors, the next step is to figure out what the problem is.

Sometimes it is obvious, other times the error message will point at a specific line in the program, but even then you aren't 100% guaranteed to know the problem.

**Strategies**:

- Putting a few strategic `console.log` calls is a good way to debug the code
- Alternative to `console.log` would be the _debugger_ capabilities of your your browser
  - e.g. using the _breakpoint_ on a specific line of code will allow you to inspect the current bindings at that point of the code.
  - You can also use the `debugger` statement in your program, if developer tools are on, the program will pause whenever it reaches that statement.

#### Error propagation

Not all problems can be prevented by the programmer, unfortunately. If your program communicates with the outside world in any way, it is possible to get malformed input, to become overloaded with work, or to have the network fail.

When your program is going to be used by anyone else, you usually want the the program to do better than just crash

- Sometimes its better to take the bad input and continue running
- Other times, its better to report to the user what went wrong and then give up

Consider a program `prompNumber` which takes in user input (a number) and returns it, what should it return on non-numbers?
Common choices would be `null, undefined, -1`.

Returning a special value is a good way to indicate an error, but consider the downsides:

- Awkward code: if `promptNumber` was called 10 times, it has to check 10 times if `null` was returned, and if its result to finding `null` is returning `null`, callers of the function will in turn have to check for it and so on.
- _What if the function can already return ALL possible kinds of values._ In such a function, you'll need to wrap the result in an object to be able to distinguish it from failure. Example:

```js
function lastElement(array) {
  if (array.length == 0) {
    return { failed: true };
  } else {
    return { element: array[array.length - 1] };
  }
}
```

#### Exceptions

When a function cannot proceed normally, what we would like to do is just stop what we are doing and immediately jump to a place that knows how to handle the problem. This is what exception **handling** does.

Exceptions are a way to make it possible for code that runs into a problem to _raise/throw_ an exception (can be any value). Raising one kinda resembles a super charged return from function, it jumps all the way down to the first call that started the current execution (unwinding the stack).

The power of exceptions likes in the fact that you can set "obstacles" along the stack to _catch_ the exception (as it is zooming down), once youv'e caught this, you may do something to address the problem and then continue to run the program.

```js
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}
// The look function totally ignores possibility of promptDirection
// going wrong
function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}
```

Analysis:

- `throw` keyword is used to throw an exception
- Catching an exception is done by wrapping piece of code in a `try` block followed by `catch`
  - When code in the `try` block causes an exception to be raised, the `catch` block is evaluated, then when it finishes, the program proceeds OR otherwise the program proceeds beneath the entire `try/catch` statement.
- We used the standard JS constructor: `Error` to create our exception value, instances of this constructor also gathers info about the call stack that existed during creation of exception, this is useful in debugging.

#### Cleaning up after exceptions

The effect of an exception is another kind of control flow. Every action that might cause an exception, which is pretty much every function call and property access, might cause control to suddenly leave your code.

Sometimes code gets broken off by exceptions at certain points and even make variables disappear in the midst of operation.

Problems like this occur in subtle ways, a way to solve this would be to use fewer side effects or even adopting a programming style that computes new values rather than changing existing data would help.

This isn't always practical. As such there is another feature that `try` statements have, they may be followed by a `finally` block instead/in addition to a `catch` block.

- A `finally` block says that _“no matter what happens, run this code after trying to run the code in the try block.”_ Consider example below:

```js
const accounts = {
  a: 100,
  b: 0,
  c: 20,
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```

Analysis:

- The function tracks its progress and repairs any damage done when the exception was called
- The `finally` block will not interfere when the exception is thrown in the `try` block (if statement).
- After the finally block runs, the stack continues unwinding

#### Selective Catching
