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
let gameState: GameState = "running";

let cursorPosition: Coordinates = [0, 0, 0];

const attachListeners = () => {
  document.getElementById("pause-button").addEventListener("click", (e) => {
    (e.target as HTMLButtonElement).innerHTML =
      gameState === "running" ? "start" : "pause";

    gameState = gameState === "running" ? "paused" : "running";
  });

  document.getElementById("reload-button").addEventListener("click", () => {
    seed();
  });

  document.addEventListener("keydown", ({ key }) => {
    switch (key) {
      case "ArrowLeft":
        cursorPosition[0] = Math.max(cursorPosition[0] - 1, 0);
        break;
      case "ArrowRight":
        cursorPosition[0] = Math.min(cursorPosition[0] + 1, 9);
        break;
      case "ArrowDown":
        cursorPosition[1] = Math.min(cursorPosition[1] + 1, 9);
        break;
      case "ArrowUp":
        cursorPosition[1] = Math.max(cursorPosition[1] - 1, 0);
        break;
    }
  });
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
    if (gameState === "running") {
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

    render({ block, zLevel: 0, tickCount, cursorPosition });

    await new Promise((resolve) => {
      setTimeout(resolve, 333);
    });
  }
};

window.onload = initialize;

const tick: BaseTick<BaseThing> = ({ thing, block }) =>
  thingUtils[thing.type].tick?.({ thing, block });
