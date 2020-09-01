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

Jack then keeps his journal for 3 months, seen in the file DIARY.txt, we can now loop over all the entries and tally how many times the event occurs in relation to squirrel transformations: 
```js 
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```
The *include* method checks whether a given value exists in the array, out function uses it to determine whether the event name was in the __event list__ for a given day. 

#### Array Loops