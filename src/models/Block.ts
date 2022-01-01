import { AllThings } from ".";
import { isCoordinates } from "./BaseThing";

/**
 * Four-dimensional array describing positions of things.
 * Each space (specified by [z][x][y]) contains a list of thing IDs
 * ordered from bottom to top.
 *
 * Note that this is in zxy order to make rendering a z-level easiser
 * while coordinates are otherwise xyz
 */
export type BlockContentList = string[][][][];

export type BlockContentDict = { [key: string]: AllThings };

// Block is going to be the main item in memory that contains the 10x10x10 grid
export type Block = {
  coords: [number, number];

  contentList: BlockContentList;
  contentDict: BlockContentDict;
};

// prettier-ignore
const getEmptyRow = (): BlockContentList[0][0] =>
  [[],[],[],[],[],[],[],[],[],[]];

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

/**
 * creates and fills a content list based off a content dictionary
 */
export const generateList = (blockDict: BlockContentDict): BlockContentList => {
  const thing: BlockContentList = Object.values(blockDict).reduce(
    (memo, thing) => {
      if (!isCoordinates(thing.position)) {
        return memo;
      }

      const [x, y, z] = thing.position;

      // currently we don't care about vertical ordering within a space
      // so just shove it in there as we go
      memo[z][x][y].push(thing.id);
      return memo;
    },
    getEmptyContentList()
  );

  return thing;
};

/**
 * Mutative! surgically update a content list
 * hopefully more efficient than reconstructing it
 */
export const updateList = ({
  list,
  diff,
  original,
}: {
  list: BlockContentList;
  diff: BlockContentDict;
  original: BlockContentDict;
}): void => {
  // for each object in the diff
  Object.entries(diff).forEach(([id, thing]) => {
    // remove it from its original position
    const oldPosition = original[id].position;
    if (isCoordinates(oldPosition)) {
      const [x, y, z] = oldPosition;
      const space = list[z][x][y];

      const i = space.indexOf(id);
      i > -1 && space.splice(i, 1);
    }

    // and add it to its new position
    const newPosition = thing.position;
    if (isCoordinates(newPosition)) {
      const [x, y, z] = newPosition;
      list[z][x][y].push(id);
    }
  });
};

export const save = ({ coords, contentDict }: Block): void => {
  const blockName = `${coords[0]}x${coords[1]}`;

  const content = JSON.stringify(contentDict);

  localStorage.setItem(blockName, content);
};
