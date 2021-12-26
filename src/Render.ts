import { AllTypes } from "./models/AllTypes";
import { Block, BlockContentDict } from "./models/Block";

// TODO: render a block with a nice border and a name
// like this:
/*
 *  +----Block1x1-----+
 *  |                 |
 *  |     block       |
 *  |    contents     |
 *  |                 |
 *  |                 |
 *  +-----------------+
 */
export const render = ({
  block: { contentList, contentDict },
  zLevel,
  tickCount = 0,
}: {
  block: Block;
  zLevel: number;
  tickCount?: number;
}): void => {
  const level = contentList[zLevel];

  const screen = level.map((row) => {
    const constructedRow = row.map((col) => {
      const thingId = col[tickCount % col.length];

      return getSymbol({ thingId, contentDict }) ?? " ";
    });

    return constructedRow.join(" ");
  });

  screen.push(`tick: ${tickCount}`);

  document.getElementById("rendering-space").innerHTML = screen.join("\n");
};

// TODO: how will we represent color information?
// this might also be better served by a object than a case statement
// but this is fine for now
export const getSymbol = ({
  thingId,
  contentDict,
}: {
  thingId?: string;
  contentDict: BlockContentDict;
}): string | undefined => {
  if (!thingId) {
    return undefined;
  }

  switch (contentDict[thingId]?.type) {
    case AllTypes.person:
      return "P";
    case AllTypes.tree:
      return "T";
    default:
      return undefined;
  }
};
