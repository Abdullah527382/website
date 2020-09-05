___
## Chapter 6: The Secret Life of Objects
Chapter 4 introduced JavaScript’s objects. In programming culture, we have a thing called object-oriented programming, a set of techniques that use objects (and related concepts) as the central principle of program organization.
## Encapsulation
In object oriented programming, the main idea is to divide programs into their own manageable state which has its own knowledge of how it works. Someone working on another *piece* of the program does not have to be aware of that knowledge.

Consider the interaction within an __object-oriented program__:
- Such program's pieces interact with eachother via *interfaces* - limited set of functions or bindings providing functionality at an abstract level thus hiding their precise implementation
- Such an objects' interface consists of a specific set of methods and properties (private and public - part of interface). 
- JS unlike other languages does not prevent outside code from accessing the private properties
- It is common to indicate *private properties* by putting _ at the start of property names.

Seperating interfaces from implementation is a good idea, known as *encapsulation*.
## Methods 
As mentioned in earlier chapters, *methods* are nothing more than properties that hold function values, e.g. below:
```js
// Rabbit
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'
```
Usually a method needs to do something with the object that it was called on (object.method()) 

- Note: The binding called *this* in its body automatically points to the object it was called on 
```js
// Function takes a string
function speak(line) { 
  // this points to caller object
  console.log(`The ${this.type} rabbit says '${line}'`);
}
// Define our objects which have a property: type as well as 
// a method: 'speak'
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'

// Alternative way to 'this':
speak.call(hungryRabbit, "I could use a carrot right now.");
/* 
    → The hungry rabbit says 'I could use a carrot right now.'
     The call function method takes a 'this' as first arg. 
*/
```
Arrow functions don't bind their own *this*, rather they can see the *this* binding of the scope around them. See below for e.g.
```js
function normalize() {
  // 'this' can access local bindings: coords, length
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]
```
This wouldn't have worked if we used *function* keyword in the arguments of map
#### Prototypes
In addition to an object's set of properties, most objects have a *prototype*. It is essentially another object that is used as a "fallback source of properties." Lets break it down:
- A prototype of an object is searched for a property IF it gets a request request for a property it __does not__ have, then the prototype's prototype and so on...
- The prototype of an empty object is *Object.prototype*, see below:
```js
// getPrototypeOf returns the prototype of an object
console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
```
- *Object.prototype* is at the root of the tree-shaped structure of JS Objects. It provides a few methods to show up in all objects such as: *toString* (converts object to string representation)
- Functions derive from *Function.prototype* and arrays derive from *Array.prototype* (shows that __not__ all objects have Object.prototype as their prototype directly), see below:
```js
console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true
```
We can use *Object.create* to create an object WITH a specific __prototype__: 
```js
let protoRabbit = {
  // Object with speak method
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
// protoRabbit is the prototype object
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
// Access 'speak' prototype
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'
```
Analysis:
- As seen above, protoRabbit acts as a container for the properties shared by ALL rabbits
- The individual 'killerRabbit' object contains properties only applicable to itself i.e. its type.

#### Classes
JS's prototype system can be interpreted as a somewhat informal take on *classes*, a class define the shape of an object i.e. what methods and properties it has, this type of object is called an __instance__ of a *class*

Consider these *instances* of a class:
- __Prototypes__ are useful in defining __properties__ for which all *instances* of class share the same value, such as methods. 
- To create an instance of a given class, you have to make an object that derives from the proper prototype but also make sure itself has properites that instances of this class are *supposed to have*, done via a *constructor* function.
```js
function makeRabbit(type) {
  // Use the 'create' method
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```
- A constructor function can be defined easier using *__new__* keyword infront of a function call, then the function is defined as a constructor.
- This means that an object with the right prototype is automatically created, bound to *__this__* in the function, and returned at the end of the function.
- The prototype object used when constructing objects is found by taking the prototype property of the constructor function.
```js
// Constructors are capitalized
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
// new keyword will treat Rabbit as a contructor 
let weirdRabbit = new Rabbit("weird");
```
This example shows us adding properties to the new object. In general all functions (including constructors) automatically get a property named *prototype*, by default holds a plain, empty object derived from *Object.prototype*, we can also overwrite with a new object if we wanted to.
- The actual prototype of a constructor is Function.prototype, its prototype *property* holds the prototype used for instances created through it
- Important to understand a *prototype* association with constructors and objects.
```js
console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) ==
            Rabbit.prototype);
// → true
```

#### Class Notation
JS classes are constructor functions with a prototype property. Consider the class notation equivalent to the constructor function shown previously:
```js
// Define a class
class Rabbit {
  // Constructor function
  constructor(type) {
    this.type = type;
  }
  // speak method
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");
```
- *class* keyword starts a class declaration which require a contructor and methods
- Any number of methods can be defined in class declaration
- constructor is treater specially, it provides the actual constructor function, others are packaged into that constructor's prototype.
- *Class* declarations only allow *methods* to be added to the prototype
- *Class* is used similarly to functions except in expressions, it doesn't define bindings rather produces consteuctor as a value. 

#### Overriding Derived Properties
A property added to an object with the same name IN the prototype, that previous property won't affect the object as it is hidden behind the object's own property, see example below:
```js
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
```
This 'overriding' concept is quite useful, as shown in our example, *overriding* can be used to express __exceptional__ properties in instances of a more *generic* class of objects, while letting the nonexceptional objects take a __standard__ value from their prototype.

Consider an application of this:
- Overriding is used to give the standard function and array prototypes a different *toString* method compared to basic object prototypes.
```js
console.log(Array.prototype.toString ==
            Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2
```
- Calling *toString()* obn an array gives result similar to calling .join(",") (puts commas between values of array). 
- Calling *prototype.toString* with an array produces different strings as it doesn't know about arrays, it would return the following:
```js
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
```
#### Maps
A *map* (noun) is a data structure that associates values with other values, we can also use objects for this but with a slight problem:
```js
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
```
Analysis:
In our object, we certainly did not list anybody named '*toString*' in our map but since objects derive from __Object.prototype__, it looks like the property is there. As using plain objects AS maps is dangerous, there are ways to fix this:
```js
// 1. Pass null to Object.create which prevents =resulting
// object deriving from Object.prototype
console.log("toString" in Object.create(null));
// → false

// --------------------------------------------------------
// 2. Use 'hasOwnProperty' method which ignores prototype:
console.log({x: 1}.hasOwnProperty("x"));
// → true
console.log({x: 1}.hasOwnProperty("toString"));
// → false
// ---------------------------------------------------------
// 3. Use JS class called maps for any types of keys:
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false
```
*Analysis*:
- The methods: set, get and has are part of the *interface* of the *Map* object

#### Polymorphism
Whenever you call the String function on an object, it will call the *toString* method on that object to create a string from it.
- Some of the standard *prototypes* define their own version of *toString* so they can create a string that contains more useful information than "[object Object]"
```js
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// → a black rabbit
```
When a piece of code is written to work with objects that have a certain interface—in this case, a *toString* method—any kind of object that happens to support this interface can be plugged into the code, and it will just work. 

This idea is known as *polymorphism*, such *polymorphic* code can work with values of different shapes assuming supportive *interface* given. An example would be a for/of loop, looping through several kinds of data structures. 
- Such loops expect the data structure to expose a specific __interface__ (i.e. in arrays and strings)
- We can also add this *interface* to your own objects too!

#### Symbols
It is possible for multiple interfaces to use same property names for different things, resulting in an object NOT being able to conform to both that interface and the standard use of pre-defined property name e.g. *toString* 

Property names can also be *symbols* which are values created with the *Symbol* function, unlike strings these are unique (cannot create same symbol twice)

```js
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55
```
- The string passed in Symbol() has no meaning besides making it easier to recognize in console.
- Symbols are suitable for making interfaces that want to live peacefully alongside other properties (no matter the name).
```js
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue yarn
```
- We use square brackets around property names to include symbol properties in object expressions, this causes property name to be evaluated which allows us to refer to a binding that HOLDS a symbol
```js
let stringObject = {
  [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope
```
#### The Iterator Interface
The object given to a for/of loop is expected to be iterable meaning it has a method named with the *Symbol.iterator symbol* (defined and stored as a property of thr Symbol function)

When called, that method should return an object that provides a second interface - *iterator* which has a next method that returns the *next* result which itself should be an object with a *value* property (providing next value if exists) and a *done* property (false for no more results).

```js
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
```
Now lets implement an iterable data structure:
```js
// Matrix class acting as a two dimensional array
class Matrix {
// The constructor function takes a width, a height, and an optional element 
// function that will be used to fill in the initial values.
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    // The class stores its content in a single array of width × height elements.
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
// There are get and set methods to retrieve and update elements in the matrix.
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
```
When looping over a *matrix*, you usually are interested in the __position__ of th elements as well as *elements* themselves

Hence we'll have our iterator produce objects with *x, y and value* properties:
```js
class MatrixIterator {
  constructor(matrix) {
    // Start at initial positions 0,0
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    // Checks whether bottom of matrix has been reached
    if (this.y == this.matrix.height) return {done: true};
    // If it hasn't, it creates the object holding current value
    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    // Updates its positions
    this.x++;
    // Move to the next row if necessary.
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}
```
Note: In this book's case, *methods* to classes (*prototype manipulation*) is added after prior related code, done for __simplicity__. In a regular program, there is no need to split code into small pieces, you'd declare these methods directly in the class instead. 
Let's set *matrix* class to be iterable and loop through it:
```js
Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
// Now we can loop over the matrix with for/of
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1
};
```
#### Getters, Setters, and Statics
*Interfaces* often consist mostly of __methods__, but it is also okay to include properties that hold non-function values. For example, Map objects have a *size* property that tells you how many *keys* are stored in them.

It is not necessary for an object to compute and store such a property directly in the instance. Directly accessed properties may hide a *method call* themselves. Such methods are called *getters* as they are defined by writing *get* infront of their method name.
```js
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};
// The associated method is called whenever someone reads
// from this object's size property
console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
```
Do something similar when a property is *written to*, using a setter:
```js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
// Read temp in degrees or fahrenheit
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
// Internally only stores in celsius
console.log(temp.celsius);
// → 30
```
As shown above, the class automatically converts to and from celsius in the fahrenheit getter and setter. 

Inside a *class declaration*, methods that have __static__ written before their name are stored on the *constructor*. So the Temperature class allows you to write Temperature.fromFahrenheit(100) to create a temperature using degrees Fahrenheit.

#### Inheritance