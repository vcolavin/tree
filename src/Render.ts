import { AllTypes } from "./models/AllTypes.ts";
import { BaseThing } from "./models/BaseThing.ts";
import { Block } from "./models/Block.ts";

// deno-fmt-ignore
const defaultField = [
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
  ["x","x","x","x","x","x","x","x","x","x",],
] as const

/** Generate a clone of the default field */
const getCleanField = (): string[][] => defaultField.map((row) => [...row]);

// TODO: this should cycle between objects if there are multiple objects on one tile
export const render = (
  { block, zLevel }: { block: Block; zLevel: number },
): void => {
  const thingsOnLevel = Object.values(block.contents).filter((thing) =>
    thing.position[2] === zLevel
  );

  const fieldToRender = getCleanField();

  thingsOnLevel.forEach((thing) => {
    const symbol = getSymbol(thing);

    if (!symbol || typeof thing.position === "string") {
      return;
    }

    fieldToRender[thing.position[0]][thing.position[1]] = symbol;
  });

  fieldToRender.forEach((row) => {
    console.log(row);
  });
};

// TODO: how will we represent color information?
// this might also be better served by a object than a case statement
// but this is fine for now
export const getSymbol = (thing: BaseThing): string | undefined => {
  switch (thing.type) {
    case (AllTypes.person):
      return "P";
    case (AllTypes.tree):
      return "T";
    default:
      return undefined;
  }
};
