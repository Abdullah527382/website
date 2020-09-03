
/*
    Program which consists of a function: deepEqual()
    which takes 2 values/objects and returns true only
    if they are the same value/objects with same property.

    My hints: 
    - First check if obj has same properties 
    - Recursively check if property values are equal 
    - To compare values, use '==='
    - To compare properties, use typeof, if this is object, do a deep
      comparison
    - Use Object.keys to go over properties of objs 
*/
/* 
let obj1 = {here: {is: "an"}, object: 2};
let obj2 = {here: {is: "an"}, object: 2};
objList1 = Object.values(obj1);
objList2 = Object.values(obj2);

console.log(objList1.length-1, objList2);
console.log(obj1 === {here: {is: "an"}, object: 2});

console.log(1 === '1'); */

function deepEqual(value1, value2){

    // Equal type values
    let equal = true;
    if (typeof(value1) == typeof(value2)){
        // Check if they are object types:
        if (typeof(value1) == 'object'){
            console.log(JSON.stringify(value1));
            // Now deep search both object's keys and values
            obj1Keys = Object.keys(value1); 
            obj2Keys = Object.keys(value2);
            obj1values= Object.values(value1); 
            obj2values = Object.values(value2);
            // Loop through these lists
            // console.log(obj1Keys, obj1values,'\n',obj2Keys, obj2values);

            for (let i = 0; i <= obj1values.length; i++){
                // Consider the objects in the list
                if (typeof(obj1values)[i] == 'object' && 
                typeof(obj2values)[i] == 'object'){
                    // Recurse this:
                    // Before we recurse, we need to store the next values
                    // If next keys are the same
                    if (obj1Keys[i+1] == obj2Keys[i+1]){
                        nextObj1Values = obj1values.slice(i+1);
                        nextObj2Values = obj2values.slice(i+1);
                        // Convert these back into objects with their keys and parse them back into
                        // the function for further recursion // EDIT BELOW //
                        //console.log((nextObj1Values), nextObj2Values);
                        // console.log(nextObj1Values , nextObj2Values)
                    } else {
                        return false;
                    }
                    //console.log(obj1Keys[i+1], obj1values[i+1], obj2Keys[i+1], obj2values[i+1]);
                    return deepEqual(obj1values[i], obj2values[i]);
                } else {
                    // Otherwise these are just plain values:
                    if (obj1values[i] !== obj2values[i]) {
                        return false;
                    }
                    if (obj1Keys[i] !== obj2Keys[i]) {
                        return false;
                    }
                    // If there are more values to compare after the recursive 
                    /* if (nextObj1Values&& nextObj2Values ){
                        return deepEqual(nextObj1Values, nextObj2Values);
                    } */
                }
            }
        } else {
                if (value1 !== value2) return false;
            }
    }
    if (value1 !== value2 && typeof(value1) != typeof(value2)) return false;
    return true;
}


// Testing
let obj = {here: {is: "an"}, roti: 3, boti: 3};
console.log(deepEqual(obj, {here: {is: "an"}, roti: 3, boti: 3}));
// → false


console.log(deepEqual(2, '2'));
