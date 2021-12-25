import { Block, generateList } from "./models/Block.ts";
import { render } from "./Render.ts";

const initialize = () => {
  // load up the data
  // initialize the block(s)

  mainLoop();
};

// 1. print the world as it is
// 2. go through each object and do a tick
// 3. reconcile all the ticks (sounds hard)
// 4. rewrite json
// 5. wait for >1 full second to have passed
// 6. goto 1

const mainLoop = async () => {
  const path = `data/block0x0.json`;
  const fileContent = await Deno.readTextFile(path);
  const contentDict = JSON.parse(fileContent);
  // TODO: Why does this have to hard-code the coords?
  // shouldn't the file also know about that
  const block: Block = {
    coords: [0, 0],
    contentDict,
    contentList: generateList(contentDict),
  };

  while (true) {
    console.clear();
    render({ block, zLevel: 0 });

    // perhaps break on a keystroke
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
};

initialize();
