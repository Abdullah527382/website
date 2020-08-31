##Chapter 1: Values, Types and operators
____

<!-- Great way to represent equations: https://latex.codecogs.com -->

#### Values
Every value has a type that will determine its role, some are numbers, others are pieces of text or even functions and so on.

To create a value, you merely invoke its name, this is convenient in comparison to other languages such as *C* where we would have to delcare type as well. Using ALOT of values simultaneously can lead to running out of memory. 

This chapter introduces the atomic elements of *JavaScript* programs, that is, the simple value types and the operators that can act on such __values__.

#### Numbers 
JS uses a fixed number of bits (64 of them), there are only so many different patterns to make with 64 bits, meaning the numbers (being patterns) have limited amount of representations. With N decimal digits, you can represent 
![equation](https://latex.codecogs.com/svg.latex?10^N) ways, similarly given 64 binary digits, you'd be able to represent 2^64 different numbers. 

Fractional numbers are written by using a dot
```javascript 
9.81
```
For very big numbers, you can use scientific notation
```javascript 
2.998e8
```

#### Arithmetic:

The main things to do with numbers is arithmetic, here is what they look like
```javascript 
10 + 4 * 11
```
This follows *bodmas* as expected unless you use braces around some numbers in the expression above

There is one more arithmetic operator *%*, used to represent the remainder operation

#### Special Numbers:
There are 3 *special numbers* in JS
```javascript 
infinity, -infinity, NaN
```
which are denoted as: infinity, negative infinity and *"Not A Number"*, the last of which you get as a result of dividing by *0*. 

#### Strings: 
Strings are used to represent text, written by enclosing their content in quotes
```javascript 
`Down on the sea`
"Lie on the ocean"
'Float on the ocean'
```
We use the *escaping* character to denote that a character after "\n" has a special meaning. Newlines can be included without escaping only with backticks (`). When an *n* character occurs after a backlash, it is interpreted as a newline character, similarly *\t* means tab. 

```javascript 
"A newline character is written like \"\\n\"."
```

Strings too are modeled as bits, the way JS does this is based on the unicode standard which included every character from *Greek, Arabic* and so on. The complication is that JS's representation uses __16 bits__ per string element which can describe up to 2^16 different characters, but unicode describes twice as many thus leading some characters in JS to take up 2 character positions. 

Strings in JS can be concatenated using the "+" operator shown below 
```javascript 
"con" + "cat" + "e" + "nate"
```
```shell
concatenate
```

String values have a number of associated functions called *methods* that can be used to perform other operations on them.

Backtick-quoted strings usually called *template literals* can do a few more tricks. When you write something inside ${ } (template literal), the result will be computed, converted to a string and included at that position. E.g.

```javascript 
`half of 100 is ${100 / 2}`
```
```shell
half of 100 is 50
```

#### Unary operators: 
Non symbolised operators are written as words. For e.g. *typeof* produces string value for the type of value you gave it

```javascript 
console.log(typeof 4.5)
// → number
console.log(typeof "x")
// → string
```
Operators that take 1 value are called unary whilst those who take 2 are called binary operators. 

#### Boolean values:

JS has a *boolean* type which has two values, *true* and *false*. We can use comparisons to produce such boolean values:

```javascript 
console.log(3 > 2)
// → true
console.log(3 < 2)
// → false
```
Similarly this can be applied to strings, they are ordered roughly alphabetically, upper case letters are always *less* than lowercase ones i.e. "Z" < "a" and non-alphabetic. Other comparison operators are >=, <=, == and !=. Examples below
```javascript 
console.log("Aardvark" < "Zoroaster")
// → true
console.log("Itchy" != "Scratchy")
// → true
console.log("Apple" == "Orange")
// → false
```
The only value __not__ equal to itself is *NaN*
```javascript
console.log(NaN == NaN)
// → false
```

#### Logical operators: 
These are operations applied to Boolean values themselves, JS supports: *and, or* and *not*. The && operator results true if both values given are true. The || operator returns true if either of the given values are true. Examples below: 
```javascript 
console.log(true && false)
// → false
console.log(true && true)
// → true
console.log(false || true)
// → true
console.log(false || false)
// → false
```
*Not* is written as !, it flips the value given to it. When mixing these boolean operators with arithmetic and other operators, consider that || has the lowest precedence, then comes &&, then *>, ==,* and so on. 

The last operator is *ternary* (operates on 3 values), written with a question mark and a colon shown below

```javascript 
console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2
```
It's often called the *conditional operator*. The value on the left of the question mark will determine which of the other 2 values will come out. If true, chooses middle, if false chooses the value on the right. 

#### Empty values:
Two special values: *null* and *undefined* are used to denote the absence of a meaningful value, they are valued which carry no information. Treat both *null, undefined* interchangeably. 

#### Automatic type conversion:
JS goes out if its way to accept any program, demonstrated below:
```javascript
// Type coercion
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
```
You result in *NaN* mostly in accidental type conversions, this is something to take note of. 

A useful behaviour to consider is when comparing *null* and *undefined*. 
```javascript 
console.log(null == undefined);
// → true
console.log(null == 0);
// → false
```
The usefulness appears when you want to test whether a value has a real value instead of *null* or *undefined*. It is also recommended using three character comparison operators (=== and !==) __defensively__ to prevent unexpected type conversions. They are used to test whether values are *precisely* equal/not equal. 

#### Short circuiting of logical operators

Logical operators && and || handle values in a manner where they convert their left hand side to boolean type in order to decide what to do

The || operator returns value to its left when that value can be *converted* to __true__ otherwise it will return the right side value. 

```javascript
console.log(null || "user")
// → user
console.log("Agnes" || "user")
// → Agnes
```

The rules for converting strings and numbers to Boolean values state that 0, NaN and empty str ("") count as *false* so: So 0 || -1 produces -1, and "" || "!?" yields "!?"

The && operator works similarly BUT the other way around, when value to its left converts to false it returns that value and otherwise it returns right hand value. 

For both of these operators, the part on their right side is only evaluated when *necessary*.