
/*
    Make the group class from the previous exercise iterable
    - Don't just return the Symbol.iterator method on the array
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

// Define the Group Iterator 
class GroupIterator {
    constructor(group){
        // Add a curr value at initial of array
        this.curr = 0;
        // the group --> an array
        this.group = group.content;
        // DEBUGGING: console.log(this.group);

    }
        next(){
        // If the current value has reached the end
        if (this.curr == this.group.length) return {done: true};
        // Increment the index 
        let value = this.group[this.curr]
        this.curr++;
        // Otherwise we haven't reached end yet
        return {value, done: false};

    } 

}
// Your code here (and the code from the previous exercise)
Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}


for (let value of Group.from(["a", "b", "c", 1, 2, 3])) {
    console.log(value);
  }
  // → a
  // → b
  // → c
  // ... 3