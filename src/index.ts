import { thingUtils } from "./models";
import { BaseThing, BaseTick, Coordinates } from "./models/BaseThing";
import {
  generateList,
  Block,
  BlockContentDict,
  save,
  updateList,
} from "./models/Block";
import { render } from "./render";
import { seed } from "./seed";

type GameState = "running" | "paused";

const globalState: { cursor: Coordinates; gameState: GameState } = {
  cursor: [0, 0, 0],
  gameState: "running",
};

const initialize = () => {
  attachListeners();

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
    if (globalState.gameState === "running") {
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
    }

    render({
      block,
      zLevel: 0,
      tickCount,
      cursor: globalState.cursor,
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 333);
    });
  }
};

window.onload = initialize;

const tick: BaseTick<BaseThing> = ({ thing, block }) =>
  thingUtils[thing.type].tick?.({ thing, block });

const attachListeners = () => {
  document.getElementById("pause-button").addEventListener("click", (e) => {
    (e.target as HTMLButtonElement).innerHTML =
      globalState.gameState === "running" ? "start" : "pause";

    globalState.gameState =
      globalState.gameState === "running" ? "paused" : "running";
  });

  document.getElementById("reload-button").addEventListener("click", () => {
    seed();
  });

  document.addEventListener("keydown", ({ key }) => {
    const { cursor } = globalState;
    switch (key) {
      case "ArrowLeft":
        cursor[0] = Math.max(cursor[0] - 1, 0);
        break;
      case "ArrowRight":
        cursor[0] = Math.min(cursor[0] + 1, 9);
        break;
      case "ArrowDown":
        cursor[1] = Math.min(cursor[1] + 1, 9);
        break;
      case "ArrowUp":
        cursor[1] = Math.max(cursor[1] - 1, 0);
        break;
    }
  });
};
