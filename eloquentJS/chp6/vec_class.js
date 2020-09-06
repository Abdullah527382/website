
/*
    A program which has a vector class, which represenets a 2D space 
    - Takes x,y as number parameters, saves to properties of the same name
    - Vec prototype has 2 methods: plus and minus which take another vector as a parameter
      and returns a new vector that has the sum or difference of the 2 vectors (this and parameter)
      x and y values
    - Add a getter property length to the prototype that computes the length of the vector
      (distance of point x, y from 0, 0)
*/

// Define the vec class:
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // The plus and minus methods for vectors
    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }
    minus(vector){
        return new Vec(this.x - vector.x, this.y - vector.y);   
    }
    // The length getter returns the distance of x, y from 0, 0
    get length(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
}

console.log(new Vec(1,2).plus(new Vec(1,2)));
// --> Vec { x: 2, y: 4 }
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
