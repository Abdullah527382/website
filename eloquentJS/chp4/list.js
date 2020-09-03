
/*
    Program which consists of a bunch of list functions 
    - arrayToList: builds up a list structure given a list
    - ListToArray: Build an array from a given list
    - prepend: takes an element and a list then creates a new list,
      and adds the element in front of the input list
      
*/

newList = {
    value: null,
    rest: null
}

function arrayToList(array){
    
    // Array length
    // Check if an empty array is given, return the newList
    if (array.length == 0) return newList;
    // Check if we are given the initial array:
    if (newList.value == null){
        // The last value of array is the most inner list value
        newList.value = array[array.length - 1];

    } else {
        // Otherwise we have a non empty list
        //console.log("prevList");console.log(newList);
        newList = {
            value: array[array.length - 1],
            rest: newList
        }
        //console.log("newList");console.log(newList);
        
        }
        //console.log("newList");console.log(newList);
    // Recurse with a list excluding the last value
    return arrayToList(array.slice(0, array.length-1));
} 

array = [];
function listToArray (list){
    // Iterate through the list
    for (curr = list; curr != null; curr = curr.rest){
        array.push(curr.value);
    }
    return array;
}

function prepend (element, list){
    // If we're given an empty list
    if (list == null){
      prependedList = {
        value: element,
        rest: null
      }
      return prependedList;
    }
    // Otherwise we have a populated list
    prependedList = {
      value: element,
      rest: list
    }
  return prependedList;
}

function nth (list, num){
    // Iterate through the list
    let count = 0;
    for (curr = list; curr; curr = curr.rest){
        if (count == num) return curr.value;
        count ++;
    }
    return undefined;
}

let count = 0;
function nth_recursive (list, num){
    // If we didn't find the num 
    if (list == null) return undefined;
    if (count == num) return list.value;
    count ++;
    return nth_recursive(list.rest, num);
}

// nth testing:
console.log(nth_recursive(arrayToList([10, 20, 30, 40, 50]), 0));
// --> 10

// Prepend testing:
console.log(prepend(20, list = {
    value:10,
    rest: {
        value:20,
        rest: {
            value:30,
            rest: {
                value:40,
                rest: {
                    value:50,
                    rest:null
                }
            }
        }
    }
}));

console.log(prepend(10, prepend(20, null)));


// Other testing
console.log(listToArray(list = {
    value:10,
    rest: {
        value:20,
        rest: {
            value:30,
            rest: {
                value:40,
                rest: {
                    value:50,
                    rest:null
                }
            }
        }
    }
}));
// → [10, 20, 30, 40, 50]
console.log(arrayToList([10, 20, 30, 40, 50]));
/*
{
    value:10,
    rest: {
        value:20,
        rest: {
            value:30,
            rest: {
                value:40,
                rest: {
                    value:50,
                    rest:null
                }
            }
        }
    }
}
