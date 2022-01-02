import { Thing, thingUtils } from "./models";
import { BaseThing, BaseTick } from "./models/BaseThing";
import { BlockContentDict, save, updateList } from "./models/Block";
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
    const diff = Object.values(block.contentDict)
      .map((thing) => tick({ thing, block }))
      .filter((diff) => diff)
      .reduce((memo, diff) => ({ ...memo, ...diff }), {});

    updateList({
      list: block.contentList,
      diff,
      original: block.contentDict,
    });

    // reconcile change (very naive implementation)
    block.contentDict = { ...block.contentDict, ...diff };

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

const tick: BaseTick<BaseThing> = ({ thing, block }) =>
  thingUtils[thing.type].tick?.({ thing, block });
