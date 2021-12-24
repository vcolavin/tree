const initialize = () => {
  // load up the data
  // initialize the block(s)

  mainLoop();
};

const mainLoop = async () => {
  while (true) {
    console.clear();
    // 1. print the world as it is
    // 2. go through each object and do a tick
    // 3. reconcile all the ticks (sounds hard)
    // 4. rewrite json
    // 5. wait for >1 full second to have passed
    // 6. goto 1

    // perhaps break on a keystroke
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    // break;
  }
};

initialize();
