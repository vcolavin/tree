import { BaseThing, Coordinates } from "./BaseThing";

/**
 * Four-dimensional array describing positions of things.
 * Each space (specified by [z][x][y]) contains a list of thing IDs
 * ordered from bottom to top.
 *
 * Note that this is in zxy order to make rendering a z-level easiser
 * while coordinates are otherwise xyz
 */
export type BlockContentList = string[][][][];

export type BlockContentDict = { [key: string]: BaseThing };

// Block is going to be the main item in memory that contains the 10x10x10 grid
export type Block = {
  coords: [number, number];

  contentList: BlockContentList;
  contentDict: BlockContentDict;
};

export const getNeighbors = ({}: {
  thing: BaseThing;
  block: Block;
}): BaseThing[] => {
  // TODO, return a list of neighbors
  // for now just do on the x-y plane
  return [];
};

export const moveTo = ({}: {
  thing: BaseThing;
  coordinates: Coordinates;
  block: Block;
}): boolean => {
  // TODO: move the data
  return true;
};

const getEmptyRow = (): BlockContentList[0][0] => [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

const getEmptyLevel = (): BlockContentList[0] => [
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
];

const getEmptyContentList = (): BlockContentList => [
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
  getEmptyLevel(),
];

// TODO right now we are going to generate the list on each game loop,
// which will probably be inefficient
// what we'll do in the future is collect diffs and apply them to the list
export const generateList = (blockDict: BlockContentDict): BlockContentList => {
  const thing: BlockContentList = Object.values(blockDict)
    .filter((thing) => typeof thing.position !== "string")
    .reduce((memo, thing) => {
      const [x, y, z] = thing.position as Coordinates;

      // currently we don't care about vertical ordering within a space
      memo[z][x][y].push(thing.id);
      return memo;
    }, getEmptyContentList());

  return thing;
};

export const save = ({ coords, contentDict }: Block): void => {
  const blockName = `block${coords[0]}x${coords[1]}`;

  const content = JSON.stringify(contentDict);

  localStorage.setItem(blockName, content);
};
