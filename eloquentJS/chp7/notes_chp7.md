___
## Chapter 7: Project: A robot
This chapter's project is to build an *automaton*, a little program which performs a task in the virtual world. A mail delivery robot picking up and delivering parcels
#### The Project: 
```js

/*    Written by Author of Eloquent Javascript and annotated by 
      Abdullah Ahmed 3rd Year Computer Science Student UNSW
 */
// Roads is an array object where each element consists of 2 places seperated by a dash
var roads = [
    // Start location-End location
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];
// Takes the array: roads as edges and splits each element upon the dash
  function buildGraph(edges) {

    let graph = Object.create(null); // creates an empty object  `graph`
    // Function within function 
    function addEdge(from, to) {
      if (graph[from] == null) { // If I have no entry from that location
        graph[from] = []; // if property named same as 'from' doesn't exist, 
        // create it to be an array.
        graph[from].push(to);  // push the value of  `to` in that array

      } else { // If I do have an entry from that location 'to'
        
      // if property named same as 'from' exists, push the value of 'to' 
      // to the array.
        graph[from].push(to);
      }
    }
    // Since roads is undirected and the datastructure we create is directed 'to and from'
    for (let [from, to] of edges.map(road => road.split("-"))) {
      // We add an edge to both: start and the end allowing us to go both ways
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  // The graph data base we create from roads
  var roadGraph = buildGraph(roads);
  
  /* Some theory: 
    What is state? When we look at our program at the processes it is undergoing and the 
    functions that are being called, all these things being manipulated and stored in 
    memory is referred to as state: Consider where we are and where we go.
    - If we travel somewhere else, we have modified state --> new environment
    - Globals store state as eveything has to store state, we cannot get rid of it
    - There is a slight problem with globals as states and their behaviour of modification, 
      the scope at which they store state is removed and WE want to have control of state 
  */
 /*
  VillageState: is a class that represents where we are and where we are going
  - It has one method: move() which essentially is a function, each of which 
    expects a 'this', e.g. in our case: this.place, this.parcels, ...
    'this' is our state
  - The constructor sets up the initial state of the object, the first function. Note:
    the second we call VillageState, we're giving it a place and 'parcels'
  - Every subsequent method gets a 'this.' that was made in the constructor
Place and Parcels: 
  - We don't know what place and parcels is at the moment and we soon try to figure that out 
    place: looks like its gonna be a string (as a key)
    parcels: looks like an array/list because he uses the map method on it, specifically 
    an array of objects (look at the return values AND the 'p.place')
Calling VillageState: 
Returns a new state and thus move() is seen as a pure function, it does not 
change some global state/ doesn't modify it neither is there any side effects. As such we 
keep calling and nothing changes.
  - Makes program alot easier to reason about
  - Makes program much more resilient to bugs
  - Makes it alot slower 
 */
  var VillageState = class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        // p = parcel
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
  }
  /*
  Usage:
  let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
  );
  let next = first.move("Alice's House");

  console.log(next.place);
  // → Alice's House
  console.log(next.parcels);
  // → []
  console.log(first.place);
  // → Post Office
  */
 
/*
    runRobot(): --> We need to know what the 3 parameters mean 
    - memory: memory is the state of the robot, history of what it knows and has done 
    - state: state is VillageState, the state of the virtual world, how do we know this?
      We are shown state = state.move() which is a dead giveaway that state --> villageState
    - robot: is some function that returns an object (defined as action) given state 
      and memory
    - In our function, the method, 'move' returns a whole new object
*/
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }
/* Pretty self explanatory function here: 
  - randomPick() takes an array and returns a random element in the array
  - The index of this element is denoted by choice
  - random() gives a random decimal between 0 - inclusive and 1 exclusive
  - * array.length increases the ceiling, larger range
*/
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
/*
  Remember: roadGraph was our graph generated from the roads which consists of a 
  place as a key and an array of addresses we can get to from it. In our case, we use:
  state.place and state.addresses.
  - randomRobot returns an object with a random direction by calling randomPick()
  - randomRobot() takes a VillageState as the parameter
  - state.place is the state we're currently at
*/
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }
  /*
    VillageState.random takes a parcel count, if none given, it assumes 5 given
    - Whatever number you pick, it will call 'randomPick(Object.keys(roadGraph))'
    - Object.keys generates a list of keys of given object, randomly with randomPick
    - In the do/while loop: It says that if we generated equal values for both place 
      and address, generate another one. (We don't want the robot to pick up and drop off
      a parcel at the same house) - solved an edge case.
    - We create a new parcel object with the place and address and push it to list of 
        parcels
    - We return a new VillageState that starts off at the post office and a list of
      however many parcels we give it, each of which include a place where we pick them 
      up and drop them off
    - We would rather call these tasks, as there are 5 things to do contrastingly to 'parcels'
      which obscure our way of thinking and deem them as nouns. We could also do with replacing
      place as pick-up and address as drop-off

    USAGE: runRobot(VillageState.random(), randomRobot);
  */
  VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
  /*
    Define a constant mailRoute as opposed to a random route generated by prior functions
   */
  var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  /*
    routeRobot() is a function which takes a villageState and memory: a list of locations
    the robot needs to visit, in this function, if it isn't given/null we assume it to be
    'mailRoute'. It returns an object which tells us the new place and slices previous one off
    USAGE: runRobot(VillageState.random(), routeRobot, []);
  */
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  
  /* You don't have to understand this code as ot delves more into the depths of 
    datastructures and algorithms - graph theory:
    findRoute: Where am I? And where do I need to go to?
    - Adds all possibilities of every way it can get away from where it is. 
    - Every one of those states, it adds where it can go to from there, etc. 
    - As it adds these steps 1 at a time, as soon as it finds a possivility that satsifies 
      all the conditions of hitting all the places it was going to; it stops 
    - Alot of the possibilities in the future are not considered
  */ 
  function findRoute(graph, from, to) {
    // A list of objects which starts with a location given as: from, and 
    // initialise an empty route
    let work = [{at: from, route: []}];
    // Consider till the end of 'work' list 
    for (let i = 0; i < work.length; i++) {
      // Create an object at instance of current element of work
      let {at, route} = work[i];
      // Take the graph's current place 
      for (let place of graph[at]) {
        // if that current place is equal to the destination 'to', return route list with
        // additional element: place (being the final)
        if (place == to) return route.concat(place);
        // Otherwise we haven't reached final yet
        // Non-backtracking: Makes sure the places it has visited won't appear again
        if (!work.some(w => w.at == place)) {
          // Increase the work array with new object element 
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }
  /*
    this function takes a village Object
  */
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }
```
