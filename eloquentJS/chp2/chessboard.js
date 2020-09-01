


/* 
    Program which createes a string representing an 8x8 grid 
    Use \n to seperate lines, at each position there is either a
    space or hash '#'. 

    Passing this string to console.log gives:
         # # # #
        # # # # 
         # # # #
        # # # # 
         # # # #
        # # # # 
         # # # #
        # # # #

    Once this works, modify it for any size assuming its given
    a binding of size n 

*/

/* 
    Note: For odd rows, even coloumns print a hash
          For even rows, odd columns print a hash

    Pseudocode:
    size = n
    while (y < n){
        while (x < n){
            if odd y:
                if even x: print hash
                else: print space
            else:
                if odd x: print hash
                else: print space
            x++;
        }
        y++;
    }

*/

/* Javascript: */

let string = ""
let size = 8, y = 0;
while (y < size){
    let x = 0;
    while (x <= size/2){
        if (x == size/2) {
            string += "\n"; 
        }
        else if (y % 2 == 1) string += "# "
        else string += " #"
        x++;
    }
    y++;
}
// Remove new line from the end
let final = string.replace(/\n$/, '');

console.log(final);