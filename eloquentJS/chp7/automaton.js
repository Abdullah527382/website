
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

let shortPath = [];

function runRobot(state, robot, memory) {
    for (let turn = 0; turn < 20; turn++) {
      /* if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      } */
      // Below will generate the route needed to follow
      if (state.place == 'Post Office' && turn == 0){
          shortPath = state.parcels;
          console.log(shortPath.length*2);

          // console.log(shortPath, `TURN: ${turn}`);
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction} with turn: ${turn}`);
      //if (action.direction == 'Post Office'){break}
      if (turn == shortPath.length*2){
        console.log(`Done in ${turn} turns`);  
        break;
        }
    }
  }

  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }

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
  
  function shortRobot(state, memory) {
    if (memory.length == 0) {
      memory = shortPathToList(shortPath);
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }

// Compute the route that was given and parse it to runRobot:
function shortPathToList(path){
        newPath = [];
        path.forEach((place) => {
        //newPath.push(place);
        // newPath.push(address);
        newPath.push(place.place);
        newPath.push(place.address);
       });
    return newPath;
}
runRobot(VillageState.random(), shortRobot, []);
