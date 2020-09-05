
/*
    Write a function that computes dominant writing direction in a string of text.
    Each script has a 'direction' property: ltr, rtl or ttb. 
    - Dominant direction would thus be the majority of the characters that have a 
      script associated with them 
    - The characterScript and countBy functions defined earlier in the chapter are 
      useful here
*/
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
// E.g. usage:
// console.log(characterScript(121));
// → {name: "Latin", …}

// Expects a collection and a function which computes a group name for a given element.
// Code has chnaged name to dir for exercise use
function countBy(items, groupName) {
    // Empty Array 
    let counts = [];
    // Use for/of over a collection
    for (let item of items) {
      // See if item is true to given function 
      let dir = groupName(item);
      // findIndex finds first value that returned true 
      // else returns -1 when no element found
      let known = counts.findIndex(c => c.dir == dir);
      if (known == -1) {
        // If doesn't exist, push it to counts with count:1
        counts.push({dir, count: 1});
      } else {
        // Otherwise increase the count of the value
        counts[known].count++;
      }
    }
    // return an array of objects
    return counts;
}
// E.g. usage:
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

function dominantDirection(text) {
    // Your code here.
    // Find our scripts in our text string 
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        // return name if it exists otherwise none
        return script ? script.direction : "none";
        // filter our scipts
    }).filter(({dir}) => dir != "none");
  // Access elements in our 1-2 sized arrays of objects
  // If there is a second script/language 
  if (scripts[1]){
  // Compare the 2 languages count and return the dir of the highest count 
  return scripts[1].count > scripts[0].count ? scripts[1].dir : scripts[0].dir;
  } else return scripts[0].dir;
}
  
  console.log(dominantDirection("Hello!"));
  // → ltr
  console.log(dominantDirection("Hey, مساء الخير"));
  // → rtl