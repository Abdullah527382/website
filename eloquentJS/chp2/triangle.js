

/*
    A program which loops 7 times to create a triangle. 
    #
    ##
    ###
    ####
    #####
    ######
    #######
*/

// The '7' can be changed to an input value
let counter = 0;
hashString = '#'
while (counter < 7){
    console.log(hashString);
    hashString += '#';
    counter++;
}