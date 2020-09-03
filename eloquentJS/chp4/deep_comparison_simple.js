

/*
    Deep compare function:
*/

function deepEqual(a, b){
    // Check if a and b are of equal type:
    if (typeof(a) == typeof(b)){
        // Check if they're type: objects
        if (typeof(a) == 'object'){
            // Create list of property names, this will help us access values too
            // when comparing if those are also equal 
            obj1Keys = Object.keys(a); 
            obj2Keys = Object.keys(b);
            // Check if both objects have same no. of properties
            if (obj1Keys.length == obj2Keys.length){
                // Then check if a has a property name in b 
                let found = false;     
                for (obj1 of obj1Keys){
                    found = false;
                    for (obj2 of obj2Keys){
                        if (obj1 == obj2){
                            found = true;
                            //console.log("object1:"+obj1, "object2"+obj2, found);
                            break;
                        }
                    }
                    if (found == false){
                        return false;
                    }
                }
                // If all so far true, compare values of the names
                // If values are of type objects, recurse with these objects but keep
                // track of the rest of the list equal = deepEqual(objA, objB);
                for (obj1 of obj1Keys){
                    let equal = deepEqual(a[obj1], b[obj1]);
                    if (equal == false) return false;
                    //console.log("recursed with:",a[obj1], b[obj1],equal);
                    /*if (typeof(a[obj1]) == typeof(b[obj1]))
                    console.log(a[obj1], b[obj1]); */
                }
            } else return false;
            // Otherwise check if they're equal '==='
        }
        // Otherwise check if they're equal '==='
        else if (a !== b) return false;
    // Otherwise they automatically are false

    } else return false;
    return true;
}

// Testing
let obj = {here: {is: "an", ok: {hi: "bye"}}, boti: 2, roti: 2, obJ: {anotha: "one"}};
console.log(deepEqual(obj, {here: {is: "an", ok: {hi: "bye"}}, roti: 2, obJ: {anotha: "one"}, boti: 2}));
// → true
/* 
console.log(deepEqual(1, 2));
// → false
console.log(deepEqual('1', 1));
// → false
console.log(deepEqual('hello', "hello"));
// --> true
console.log(deepEqual(1, 1));
// --> true
*/
