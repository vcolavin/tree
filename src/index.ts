import block1 from "../data/block1x1.json" assert { type: "json" };

console.log(Object.values(block1));

console.log("look at this cool uuid!", crypto.randomUUID());

const initialize = () => {
  mainLoop();
};

const mainLoop = async () => {
  while (true) {
    // 1. print the world as it is
    // 2. go through each object and do a tick
    // 3. reconcile all the ticks (sounds hard)
    // 4. rewrite json
    // 5. wait for >1 full second to have passed
    // 6. goto 1

    // perhaps break on a keystroke
    break;
  }
};

initialize();
