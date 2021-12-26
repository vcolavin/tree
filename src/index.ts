import { BlockContentDict } from "./models/Block";
import { Block, generateList } from "./models/Block";
import { render } from "./Render";
import { seed } from "./seed";

const initialize = () => {
  const fileContent = localStorage.getItem("block0x0");
  const contentDict: BlockContentDict = JSON.parse(fileContent);

  if (!contentDict) {
    seed();
  }

  const block: Block = {
    coords: [0, 0],
    contentDict,
    contentList: generateList(contentDict),
  };

  mainLoop(block);
};

const mainLoop = async (block: Block) => {
  let tickCount = 0;

  while (++tickCount) {
    console.clear();
    render({ block, zLevel: 0, tickCount });

    // perhaps break on a keystroke
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
};

initialize();
