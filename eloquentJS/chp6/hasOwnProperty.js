
/*
    Consider when your map wants to include the word: "hasOwnProperty", a slight issue:
    - We won't be able to call that method anymore because the object's own property hides 
      method value
    Think of a way to call 'hasOwnProperty' on an object that has its own property by that name
*/

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(hasOwnProperty.call(map, "LIGMA"));

// → FALSE