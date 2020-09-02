
/*
    Program which consists of function; range
    which takes 2 arguments, optionally 3. 
    The first 2 are start and end values, the 3rd is 
    a step value which acts as the increment 

    Another function sum takes an array of numbers
    and returns the sum of these numbers
*/


function range(start, end, step){
    let array = [];
    // Consider if the step is given
    if (step == undefined) step = 1;
    // If the end > start
	if (end >= start){
		for (let i = start; i <= end; i+=Math.abs(step)){
			array.push(i);
        }
    // Otherwise start > end
	} else {
        // This assumes step is negative
		for (let i = end; i <= start; i+=Math.abs(step)){
			array.unshift(i);
		}
	}
	return array;
}

function sum (array){
	let sum = 0, i = 0;
	for (let num of array){
		sum += array[i]; 
		i++;
	}
	return sum;
}
 
console.log(sum(range(10,2,2)));

console.log(range(10,2,2));

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
//console.log(sum(range(1, 10)));
// → 55