import trees from "../data/trees.json" assert {type: 'json'};

import {v5} from './packages.ts'


// const trees = await import('../data/trees.json', {
//   assert: { type: 'json' }
// });

console.log(trees[0]);

const data = new TextEncoder().encode("Hello World!");

const uuid = await v5.generate('6ba7b810-9dad-11d1-80b4-00c04fd430c8', data)
console.log('look at this cool uuid!', uuid)




// we will need to have a basic loop function
// and in that function we go through each object and state an intention
// then there is a reconcilliation step
// then everything gets re-written to the data json file
