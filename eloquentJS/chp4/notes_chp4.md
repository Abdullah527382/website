___
## Chapter 4: Objects and Arrays
*Numbers, Booleans, and strings* are the atoms that data structures are built from. Many types of information require more than one atom, though. __Objects__ allow us to group values—including other objects—to build more *complex* structures.

#### Data sets
JavaScript provides a data set for specifically storing sequences of values, called an array, below shows an example
```js
  let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```
The first index of an array is __zero__, not one. So the first element is retrieved with listOfNumbers[0]

#### Properties
We have already come across properties in myString.length and Math.max, the names after the dots are properties. All __valid__ property names are strings, easily accessed by a dot, otherwise accessed by square braces: value[2], value["John Uptight"]. 

_Accessing properties:_
- *value.x* fetches the property of value named 'x',e.g. if you know the name of the property as 'color', you say: value.color 
- *value[x]* tries to evaluate the expression x and uses the result, converted to a string, as a property name.  e.g. If you want to extract property named by the value held in the binding i, you say: value[i]

The *length* property of an array tells us how many elements it has, use: array.length

#### Methods 
In addition to the above length property, there are a number of properties that hold function values. Consider below:
```js
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH
```
Every string has a toUpperCase, toLowerCase property. Properties that contains functions are generally called *methods* of the value they belong to, e.g. *toUpperCase* is a method of a string.

The example below shows 2 methods: *push* (add values to end of array), *pop* (remove last value in array and return it).
```js
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```

#### Objects
Values of the type __object__ are arbitrary collections of properties. One way to create an object is by using braces as an expression.
```js
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
```
Reading a property that doesn’t exist will give you the value *undefined*.

The delete operator applied to an object property, will remove the named property from the object.
```js
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
```
The binary __in__ operator, when applied to a string and an object, tells you whether that object has a property with that name.
 
To find out what _properties_ an object has, you can use the __Object.keys__ function. You give it an object, and it returns an array of strings—the object’s property names.
```js
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
```
There’s an Object.assign function that copies all properties from one object into another.
```js
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// → {a: 1, b: 3, c: 4}
```
Following on from the "squirrel" example from eloquent JS, we represent that Jack keeps a journal as an array of objects:
```js
let journal = [
  {events: ["work", "touched tree", "pizza",
            "running", "television"],
   squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
            "lasagna", "touched tree", "brushed teeth"],
   squirrel: false},
  {events: ["weekend", "cycling", "break", "peanuts",
            "beer"],
   squirrel: true},
  /* and so on... */
];
```

#### Mutability

Objects work different to numbers, strings and booleans (these can't be modified). You can change their properties, causing a single object value to have different content at different times.

For objects, having 2 references to the same object opposed to having 2 objects with identical properties yields a difference. Consider below:
```js
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10
```
Bindings can also be constant or changeable. Consider a const binding to an object, it itself cannot change but the contents of that object might:
```js
const score = {visitors: 0, home: 0};
// This is okay
score.visitors = 1;
// This isn't allowed
score = {visitors: 1, home: 1};
```

#### The Squirrel Exercise: Log 
Jack has now set up his *environment* for the __journal__:
```js
let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}
```
He then records the day as such:
```js
addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);
```
He wants to compute the correlation between two boolean variables, e.g. eating pizza and becoming squirrel (true, true), he has to compute the *phi* coefficient:
```js
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));
// → 0.068599434

// NOTE: The function above can be destructured for readability
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}
```
Jack then keeps his journal for 3 months, seen in the file DIARY.txt, we can now loop over all the entries and tally how many times the event occurs in relation to squirrel transformations: 
```js 
// Function that returns a list of how many times an
// event occurs in relation to squirrel transforms
function tableFor(event, journal) {
// Define our empty table
  let table = [0, 0, 0, 0];
  // Loop through our journal
  for (let i = 0; i < journal.length; i++) {
    // Each entry is an object consisting of a list (events)
    // and a boolean (squirrel)
    let entry = journal[i], index = 0;
    // If the events list contains our event, tally it in our
    // table [0, __, 0, 0]
    if (entry.events.includes(event)) index += 1;
    // If our squirrel boolean is true, tally it in our table 
    // [0, 0, 0, __]
    if (entry.squirrel) index += 2;
    // Tally our table with respect to index
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```
The *include* method checks whether a given value exists in the array, out function uses it to determine whether the event name was in the __event list__ for a given day. 

#### Array Loops
The for loop in the tableFor function can be replaced with a simpler alternative: 
```js
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```
- *Entry* is a variable definition
- The word after *of* is the iterable, i.e. JOURNAL.

#### The analysis
We need to now compute the correlation for every type of event that occurs in the data set, use:
```js
// Function which returns a list of events in journal
function journalEvents(journal) {
  let events = [];
  // Loop through journal
  for (let entry of journal) {
      // Loop through each list in Journal
    for (let event of entry.events) {
        // If the list element is not in events 
      if (!events.includes(event)) {
        // Add the event to our list
        events.push(event);
      }
    }
  }
  // Return our list of events
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]
```
Using the above function, we can now combine it with our other functions to get correlations
```js
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...
```
The results should be filtered to see which correlations aren't closer to zero, consider correlations greater than 0.1 or less than -0.1:
```js
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// → weekend:        0.1371988681
// → brushed teeth: -0.3805211953
// → candy:          0.1296407447
// → work:          -0.1371988681
// → spaghetti:      0.2425356250
// → reading:        0.1106828054
// → peanuts:        0.5902679812
```
As shown above eating peanuts has a strong effect whereas as rather brushing teeth has a significantly negative effect on *squirrelification*. Lets try something
```js
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
     !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1
```
This is a strong result, squirrelification occurs whenever he eats peanuts and fails to brush his teeth. 

#### Further Arrayology
In addition to *push* and *pop* methods to remove add and remove elements at the end of an array, we have other useful methods:
```js
let todoList = [];
function remember(task) {
  todoList.push(task);
}
// Removes front list element
function getTask() {
  return todoList.shift();
}
// Adds a task to the front of a list
function rememberUrgently(task) {
  todoList.unshift(task);
}
// Search for a specific value from start
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
// Search for a specific value from end
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
// Both of the above have optional 2nd argument 
// Indicating where to start search from

// Slice returns array that has elements between given indices:
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
// Start is inclusive, end is exclusive
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]

// concat is used to glue arrays together to create a 
// new array
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
```

#### Strings and their properties
Remember that string values are immutable and cannot be changed therefore we cannot set new properties on them. Although there are some very useful methods in strings, some shown below 
```js
// Both of these resemble slice and indexOf from array methods
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
// indexOf with several characters:
console.log("one two three".indexOf("ee"));
// → 11

// trim method removes whitespace start and end of string 
console.log("  okay \n ".trim());
// → okay

// split and join can be used on strings
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping

// String can be repeated with repeat
console.log("LA".repeat(3));
// → LALALA

// We've already seen .length and accessing string elements:
let string = "abc";
console.log(string.length);
// → 3
console.log(string[1]);
// → b
```

#### Rest parameters
It can be useful for a function to accept any number of arguments. To write such a function, you put __three dots__ before the function's last parameter as shown below:
```js
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9

// You can also use the notation when calling the function: 
let numbers = [5, 1, 7];
console.log(max(...numbers));

// Swuare brackets similarly allow for the triple-dot operator 
// to spread another array into the new array
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```

#### Math objects:
As we’ve seen, Math is a grab bag of number-related utility functions, such as Math.max (maximum), Math.min (minimum), and Math.sqrt (square root).

There are others to consider:
```js
// We can do trignometry with cos, sin and tan
// Use their inverses or even use PI
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));
// → {x: 0.3667, y: 1.966}

// Math.random returns a new pseudorandom number between 
// zero (inclusive) and one (exclusive)
console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335

// Math.floor rounds down to nearest whole number 
console.log(Math.floor(Math.random() * 10));
// → 2

// Similarly we can use Math.ceil to round up, Math.round to
// round to nearest whole number, Math.abs for absolute values.
```

Small trick for an object; looking inside the object with braces
```js
let {name} = {name: "Faraji", age: 23};
console.log(name);
// → Faraji
```

#### JSON
Perhaps we want to save data in a file for later use or send it to another computer over the net, we would have to convert these tangled memory addresses to a description that can be sent and stored.

What we do is serialize the data, meaning converting it into flat description. JSON is a popular serialization format, widely used.

Here's an example of JSON data:
```JSON
{
  "squirrel": false,
  "events": ["work", "touched tree", "pizza", "running"]
}
```
JavaScript gives us functions *JSON.stringify* and *JSON.parse* to convert data to and from this format. The first returns a JSON-encoded string and the second takes such a string and converts it to the value it encodes:

```js
let string = JSON.stringify({squirrel: false,
                             events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```