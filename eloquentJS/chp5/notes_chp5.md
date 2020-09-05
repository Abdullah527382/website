___
## Chapter 5: Higher-Order Functions

A large program is a costly program and not just because of the time it takes to build but the complexity which in turn confuses programmers leading them to introduce bugs into the program. 

#### Abstraction
Certain vocabularies which hide details and give us the ability to talk about our problems at a higher level are called *abstractions*. 

E.g. consider 2 programs below which sum the range of 1..10, the latter is more *abstract*
```js
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
// VS
console.log(sum(range(1, 10)));
```
In programming, it is a useful skill to know when you are working too low a level of *abstraction*

#### Abstracting Repetition:
It is common for a program to do something a given number of times, we use a loop but then we go *further* and abstract it to *N times*. 
```js
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
// -----------------------------------------------------
// Do something other than "console.log"
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, console.log);
// → 0
// → 1
// → 2

// -----------------------------------------------------
// We don't have to pass a predefined function to repeat()
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```
Note: For the *non-predefined function*, we can __omit__ the braces and write the loop on a single line.

#### Higher-Order functions:
Functions which operate on other functions (either by argument or return value) are called *higher-order* functions. They allow us to abstract over *actions*, see below for examples:
```js
// 1. Functions that create new functions
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
```
```js
// 2. Functions that change other functions
// noisy takes a function as a parameter
function noisy(f) {
  // Other args are dealt with inside the function
  return (...args) => {
    console.log("calling with", args);
    // Perform function operation
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1
```
```js
// 3. Functions which provide new control flow
function unless(test, then) {
  // If test expr false, then do something specified
  if (!test) then();
}
repeat(3, n => {
  // If not odd, then say its even
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even
```
There even is a built-in array method called *forEach*, which provides a for/of loop as a *higher order function*.
```js
["A", "B"].forEach(l => console.log(l));
// → A
// → B
```

#### Script Data Set 
One area where higher-order functions shine is *data processing.* To process data, we’ll need some actual data. This chapter will use a data set about scripts—writing systems such as Latin, Cyrillic, or Arabic.

The example data set contains some pieces of information about the 140 scripts defined in *Unicode*.

```js
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```
The ranges property contains an array of *unicode character ranges*, each of which is a two-element array containing a __lower bound__ and an __upper bound__. Any character codes within these ranges are assigned to the script.
#### Filtering Arrays
The following function finds scripts that are still in use, i.e. 'living'. 
```js
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
// Note: filter is also a standard array method, like forEach. 
// See method usage:
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]
```
Note how the *filter* function, rather than deleting elements from the existing array, builds up a __new array__ with only the elements that pass the test. This function is *pure*. It __does not__ modify the array it is given.

#### Transforming With Map
The map method *transforms* an array by applying a function to all of its elements and building a new array from the returned values. The new array will have the same length as the input array, but its content will have been __mapped__ to a new form by the function.
```js
// Function definition
function map(array, transform) {
  // Empty mapped list
  let mapped = [];
  // Each element in array will be transformed
  for (let element of array) {
    // Push transformation onto mapped list
    mapped.push(transform(element));
  }
  return mapped;
}
// Filter our scripts that are "rtl" 
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
// Apply transformation to our filtered scripts
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
```

#### Summarizing With Reduce
Another common thing to do with arrays is to *compute* a single value from them. 

The higher-order operation that represents this pattern is called __reduce__. It builds a value by repeatedly taking a single element from the array and combining it with the current value.

The parameters to __reduce__ are, apart from the array, a combining function and a start value.
```js
// Takes an array, a combine function, start index
function reduce(array, combine, start) {
  let current = start;
  // Curr starts of at the start index
  for (let element of array) {
    // current = 1 = 0 + 1
    // current = 3 = 1 + 2
    // ...
    // current = 10 = 6 + 4
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
// You may leave off the start argument if your list contains
// atleast 1 element, start becomes first element of array
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10
```

We can use __reduce__ twice to find the script with the most amount of characters. 
```js
// Function takes a script
function characterCount(script) {
  // Count the no. of elements between the 2 element arrays
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}
// Takes 2 scripts at a time, then compares till end of array
console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
```
Some notes to consider:
- The characterCount function reduces the ranges assigned to a script by __summing__ their sizes. 
- The second call to __reduce__ then uses this to find the largest script by repeatedly comparing two scripts and returning the larger one.

#### Composability:
Alternate code for the previous example:
```js
let biggest = null;
for (let script of SCRIPTS) {
  if (biggest == null ||
      characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}
console.log(biggest);
// → {name: "Han", …}
```
The code is very *readable* yet not much more complex than previous. 

Higher-order functions start to shine when you need to *compose* operations. Look at the example below 
```js
// Program which finds the average 'year of origin' 
// for living and dead scripts in the data set

// Function takes an array
function average(array) {
    // Sum of all values / amount of values
  return array.reduce((a, b) => a + b) / array.length;
}
// Compute average of living scripts 
console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1165
// Compute average of dead scripts
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 204
```
Analysis:
- Dead scripts on average are older than living ones as expected
- We start with all scripts and filter accordingly (like a pipeline), take the years of those, average, then round the result.

*Alternative* for computation below:
```js
let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// → 1165
```
__Comparison__:
- It is harder to see what is going on in the alternative approach and how
- The first will build up new arrays when running *filter* and *map* whereas the second just computes some numbers thus doing less work. 
- The first approach is more readable but the second is overall faster for large arrays. 

#### Strings and Character Codes
Considering the data set once again, we can figure out what script a piece of text is using. Consider the program below:
```js
// Takes in a script code
function characterScript(code) {
  // Consider each script 
  for (let script of SCRIPTS) {
    // Access the ranges in a script 
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}

// some() method checks if any of the elements 
// in an array pass a test of a test function

```
JavaScript, *Code Units* and __UTF-16__:
- JS strings are encoded as a sequence of 16 bit numbers called *code* units. 
- Code units were supposed to initially fit unicode character codes - giving us a little over 65000 characters, this wasn't enough and as such, __UTF-16__ was created (more memory per character), a format used by JS strings. 
- UTF-16 shows most common characters using a single 16-bit code unit but uses a pair of 2 such units for others.
- UTF-16 is generally considered a bad idea today, for instance, if your language doesn't use 2-unit characters, that will appear to work just fine but as soon as someone uses such a program with less common chinese characters, it breaks. Fortunately, everyone has started using 2-unit characters.
- Obvious operations on JS strings such as length and accessing their content via [], deal only with code-units: 
```js
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
// charCodeAt method gives you a code unit
// but not a full character code
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)
// codePointAt does give a full Unicode character.
```
Analysis:
- The codePointAt() method could be used to get characters from a string 
- We need to consider whether a character takes up 1 or 2 code units. We can use a for/of loop to loop it over a string giving us real characters, not code units
```js
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉
```
NOTE: You can use *codePointAt(0)* to get its code 

#### Recognizing Text
Now as we have a *characterScript* function, giving us a way to correctly loop over characters. The next step is to count characters that belong to each script. 
```js
// Expects a collection and a function which computes a
// group name for a given element.
function countBy(items, groupName) {
  // Empty Array 
  let counts = [];
  // Use for/of over a collection
  for (let item of items) {
    // See if item is true to given function 
    let name = groupName(item);
    // findIndex finds first value that returned true 
    // else returns -1 when no element found
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      // If doesn't exist, push it to counts with count:1
      counts.push({name, count: 1});
    } else {
      // Otherwise increase the count of the value
      counts[known].count++;
    }
  }
  // return an array of objects
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
```
Analysis:
- *countBy* takes a collection of values and a function to see if each collection value true or false
- *countBy* is called to return an array of objects that is determined inside the for/of loop
- *findIndex* is called to determine the first value which sufficed the condition. If such a value exists, it increases it's count otherwise pushes it to empty counts array

Now we can write a function that tells us which *scipts* are used in a piece of text and their percentage.
```js
function textScripts(text) {
  // scripts determined by countBy function
  let scripts = countBy(text, char => {
    // script determined by codePointAt
    let script = characterScript(char.codePointAt(0));
    // return name if script exists otherwise none
    return script ? script.name : "none";
  // filter our "scripts" with existent names only
  }).filter(({name}) => name != "none");
  
  // Find total of existent scripts with reduce
  let total = scripts.reduce((n, {count}) => n + count, 0);
  // Otherwise none exist
  if (total == 0) return "No scripts found";
  
  // Transform array into script percentage and script 
  // name of a string
  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
```
Analysis:
- The function first *counts* characters by name, using characterScript to give *them* a name otherwise "none", followingly "none" entries are dropped from the resulting array since we aren't interested in them.
- We obtain the total number of characters that belong to a script as needed for percentage computation.
- Lastly, the function transforms the counting entries into readable strings with *map* combined with *join*