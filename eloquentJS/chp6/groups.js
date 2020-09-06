
/*
    We are going to write a class similar to set which holds a collection of values 
    - It doesn't associate other values with those unlike 'map'.
    - It just tracks which values are part of the set. 
    - A value can be part of a set only once, no repetitions

    We will call this class 'Group' 
    - Methods: add, delete and has
    - The constructor creates an empty group
    - add adds a value to the group (if it isn't a member so far)
    - delete removes its argument from the group (if it was a member)
    - has returns a boolean value indicating whether its argument is a member of the group.

    - To determine if 2 values are the same; use the === operator or indexOf 
    - Give the class a static 'from' method that takes an iterable and creates a group 
      (which contains all values produced by iterating over it).

*/

// The Group class
class Group {
    // The constructor creates an empty group
    constructor () {
        this.content = [];
    }
    // Add a value to the array if it is not present
    add (value){
        if (!this.content.includes(value)) return this.content.push(value);
    }
    delete (value){
        //if (this.content.includes(value)) return this.content.pop(value);
        //if (this.content.includes(value)) 
        this.content = this.content.filter((function(val) {
            // console.log(currVal);
            return val != value; 
        }));
        //this.content = filtered;
        return this.content;
        //console.log(filtered);
    }
    has (value){
        if (this.content.includes(value)) return true;
        return false;
    }
    static from (values){
        let group = new Group();
        for (let value of values){
            group.add(value);
        }
        return group;
    }
}


// TESTING: -----------------------------------------
let group = Group.from([1,2,3]);
console.log(group);
group.add(10);
group.add(39);
group.add(100);
console.log(group);
group.delete(10);
group.delete(100);
console.log(group);
console.log(group.has(39));
// -> true
console.log(group.has(10));
// -> false
/*
Group { content: [] }
Group { content: [ 1, 2, 3 ] }
Group { content: [ 1, 2, 3, 10, 39, 100 ] }
Group { content: [ 1, 2, 3, 39 ] }
true
false
*/
console.log('-----------------------------------------------');
let new_group = Group.from([10,20]);
console.log(new_group.has(10));
// → true
console.log(new_group.has(30));
// → false
new_group.add(10);
new_group.delete(10);
console.log(new_group.has(10));
// → false
