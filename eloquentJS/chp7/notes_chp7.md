___
## Chapter 7: Project: A robot
This chapter's project is to build an *automaton*, a little program which performs a task in the virtual world. A mail delivery robot picking up and delivering parcels

#### Meadowfield
This vilage is described an array of roads, a total of 14 with 11 places:
```js
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
```

This network builds a __graph__ where the *points* are places in our village and *lines* between them are roads. 
We should convert this list of roads to a suitable data structure that, for each place, tells us what can be reached from there.

```js
// Graph takes the roads list
function buildGraph(edges) {
  // Create an empty object with the create method
  let graph = Object.create(null);
  // Add a place and its connection
  function addEdge(from, to) {
    // If there is no such place
    if (graph[from] == null) {
      // Initialize the place and make a list with the connection
      graph[from] = [to];
    } else {
      // Otherwise just add the connection to the existent array
      graph[from].push(to);
    }
  }
  // From the roads list, transform (split) each element 
  for (let [from, to] of edges.map(r => r.split("-"))) {
    // Add the edge from and to
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
// Initialise a graph
const roadGraph = buildGraph(roads);
console.log(roadGraph);
```

buildgraph is given an array of edges and uses that to make a map object that for each node stores an array of connected nodes.

#### The Task 