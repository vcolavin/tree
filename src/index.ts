import { tick } from "./models/BaseThing";
import { BlockContentDict, save } from "./models/Block";
import { Block, generateList } from "./models/Block";
import { render } from "./Render";
import { seed } from "./seed";

const initialize = () => {
  let loadedContent = localStorage.getItem("0x0");

  // if the contents don't exist
  // we must generate and save them
  if (!loadedContent) {
    seed();
    loadedContent = localStorage.getItem("0x0");
  }

  const contentDict: BlockContentDict = JSON.parse(loadedContent);

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
    // generate and collate changes
    const diffs = Object.values(block.contentDict).map((thing) =>
      tick({ thing, block })
    );

    // reconcile change (very naive reconcilliation)
    block.contentDict = diffs.reduce((memo, diff) => ({ ...memo, ...diff }), {
      ...block.contentDict,
    });

    block.contentList = generateList(block.contentDict);

    save(block);

    render({ block, zLevel: 0, tickCount });

    // perhaps break on a keystroke
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    // break;
  }
};

window.onload = initialize;
