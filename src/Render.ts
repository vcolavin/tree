import { thingUtils } from "./models";
import { Coordinates } from "./models/BaseThing";
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
  cursor,
}: {
  block: Block;
  zLevel: number;
  tickCount?: number;
  cursor: Coordinates;
}): void => {
  const level = contentList[zLevel];
  let thingsAtCursor: string[];

  const screen = level.map((row, rowIndex) => {
    const constructedRow = row.map((col, colIndex) => {
      // rendering the cursor
      if (colIndex === cursor[0] && rowIndex === cursor[1]) {
        thingsAtCursor = col;

        if (tickCount % 3 === 0 || (tickCount - 1) % 3 === 0) {
          return "X";
        }
      }

      // the % operator allows us to cycle through items on a space
      const thingId = col[tickCount % col.length];

      return getSymbol({ thingId, contentDict }) ?? " ";
    });

    return constructedRow.join(" ");
  });

  screen.push(`tick: ${tickCount}`);

  const description = thingsAtCursor
    .map((id) => {
      const thing = contentDict[id];

      // TODO: I shouldn't need as any here
      return thingUtils[thing.type]?.describe(thing as any);
    })
    .filter((str) => str)
    .join("\n");

  document.getElementById("details-sidebar").innerHTML = description;

  document.getElementById("rendering-space").innerHTML = screen.join("\n");
};

// TODO: how will we represent color information?
// e.g. something on fire should be red
// this might also be better served by a object than a case statement
// but this is fine for now
export const getSymbol = ({
  thingId,
  contentDict,
}: {
  thingId?: string;
  contentDict: BlockContentDict;
}): string | undefined => {
  const thing = contentDict[thingId];

  return thingUtils[thing?.type]?.symbol;
};
