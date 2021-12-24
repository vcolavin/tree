import { BaseThing, Coordinates } from "./BaseThing.ts";

// Block is going to be the main item in memory that contains the 10x10x10 grid
export type Block = {
  coords: [number, number];

  // TODO: Rather than an unorganized dictionary
  // this could maybe be split into 10 layers,
  // each with their own dictionary
  // that might make rendering easier
  contents: { [key: string]: BaseThing };
};

export const getNeighbors = (
  {}: { thing: BaseThing; block: Block },
): BaseThing[] => {
  // TODO, return a list of neighbors
  // for now just do on the x-y plane
  return [];
};

export const moveTo = (
  {}: { thing: BaseThing; coordinates: Coordinates; block: Block },
): boolean => {
  // TODO: move the data
  return true;
};

export const save = (block: Block): void => {
  const path = `data/block${block.coords[0]}x${block.coords[1]}.json`;

  const content = JSON.stringify(block.contents);

  Deno.writeTextFile(path, content);
};
