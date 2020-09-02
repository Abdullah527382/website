
/*
    Program which consists of a bunch of list functions 
    - arrayToList: builds up a list structure given a list
*/

newList = {
    value: null,
    rest: null
}

function arrayToList(array, prevList){
    
    // Array length
    // Check if an empty array is given, return the newList
    if (array.length == 0) return newList;
    // Check if we are given the initial array:
    if (newList.value == null){
        // The last value of array is the most inner list value
        newList.value = array[array.length - 1];
    } else {
        // Otherwise we have a non empty list
        newList.rest = prevList.rest;
        console.log("prevList");console.log(prevList.rest);
        newList.value = array[array.length - 1];
        //newList.rest = prevList;
        //console.log("newList");console.log(newList);
        
        }
    // Recurse with a list excluding the last value
    return arrayToList(array.slice(0, array.length-1), newList);
} 

/* 
function arrayToList(array){

    // Create our end value of this list
    newList = {
        value: null,
        rest: null
    }
    for (let i = array.length; i >= 0; i--){
        if (newList.value == null){
            newList.value = array[i - 1];
        } else {
            tempList = newList;
            tempList.value = array[i - 1];
            tempList.rest = newList;
        }
    }

    return newList;
} */



console.log(arrayToList([10, 20, 30, 40]));
// → {value: 10, rest: {value: 20, rest: null}}