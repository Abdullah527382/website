## Chapter 9: Regular Expressions

Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many other languages and systems.

#### Creating A Regular Expression

A regular expression is a type of object. It can be either constructed with the RegExp constructor or written as a literal value by enclosing a pattern in forward slash (/) characters.

```js
let re1 = new RegExp("abc");
let re2 = /abc/;
// The pattern is an a char collowed by a b, then c
```

Backslashes are treated differently. they change the meaning of the pattern. For e.g. question marks and plus signs have meaning in Regexps, a backslash will precede them if they aim to represent the character itself.

```js
let eighteenPlus = /eighteen\+/;
```

#### Testing for matches

Regexps have many methods, the most simplest one is `test` which will return Boolean telling you whether the string contains a match of the pattern in the expression

```js
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
```

#### Sets of characters

In a regular expression, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets.

```js
// Both of the following expressions match all strings that contain a digit:
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
```

Consider some shortcuts for some common character groups:

\d Any digit character
\w An alphanumeric character (“word character”)
\s Any whitespace character (space, tab, newline, and similar)
\D A character that is not a digit
\W A nonalphanumeric character
\S A nonwhitespace character
. Any character except for newline

To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write a caret (^) character after the opening bracket.

```js
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true
```

#### Repeating parts of a pattern

When you put a **plus sign** (+) after something in a regular expression, it indicates that the element may be repeated more than once. Thus, /\d+/ matches one or more digit characters. The star (\*) has similar effect but incorporates matches of 0 instances

A **question mark** makes a part of a pattern optional, meaning it may occur zero times or one time.

```js
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
```

To indicate that a pattern should occur a precise number of times, use **braces**.

- Putting {4} after an element, for example, requires it to occur exactly four times.
- It is also possible to specify a range this way: {2,4} means the element must occur at least twice and at most four times. {5, } means 5 or more times -> open-ended ranges

```js
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true
```

#### Grouping subexpressions

To use an operator like \* or + on more than one element at a time, you have to use parentheses

```js
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```

The first and second + characters apply only to the second o in boo and hoo, respectively. The third + applies to the whole group (hoo+), matching one or more sequences like that.
The i at the end makes this regexp case insensitive.

#### Matches and Groups

We can use the `exec` method to return an object with info about the match and `null` otherwise

```js
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
// Index tells us where in the string the successful match begins

// String values also have a match method:
console.log("one two 100".match(/\d+/));
// → ["100"]
```

When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array. The whole match is always the first element.

```js
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
```

Sometimes the group does not get matches, as such the array will output `undefined`

```js
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]
```

#### The Date Class

