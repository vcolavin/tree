import { AllTypes } from "./models/AllTypes.ts";
import { Block, BlockContentDict } from "./models/Block.ts";

const emptyRow = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "] as const;

// TODO: this should cycle between objects if there are multiple objects on one tile
export const render = (
  { block: { contentList, contentDict }, zLevel }: {
    block: Block;
    zLevel: number;
  },
): void => {
  const level = contentList[zLevel];

  level.forEach((row) => {
    const constructedRow = emptyRow
      .map((val, col) =>
        getSymbol({ thingId: row[col]?.[0], contentDict }) ?? val
      );

    console.log(constructedRow.join(" "));
  });
};

// TODO: how will we represent color information?
// this might also be better served by a object than a case statement
// but this is fine for now
export const getSymbol = (
  { thingId, contentDict }: { thingId?: string; contentDict: BlockContentDict },
): string | undefined => {
  if (!thingId) {
    return undefined;
  }

  switch (contentDict[thingId]?.type) {
    case (AllTypes.person):
      return "P";
    case (AllTypes.tree):
      return "T";
    default:
      return undefined;
  }
};
