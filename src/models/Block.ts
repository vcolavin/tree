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

export const save = (_block: Block): void => {
  // convert block contents to JSON then
  // write block to file at `data/block${block.coords[0]}x${block.coords[1]}`
};

export const render = (
  {}: { block: Block; zLevel: number },
): void => {
  // console.clear();
  // Object.values(block.contents).forEach(/*
  //  print a 10x10 grid of the z-level
  //  open question is how to retrieve just those items.
  //  maybe for right now just go through all 10 levels and pick the ones you like
  // */);
};
