import { Block, save } from "./models/Block.ts";
import { Tree } from "./models/Tree.ts";
import { Person } from "./models/Person.ts";
import { BaseThing, Coordinates, Position } from "./models/BaseThing.ts";

const generateRandomCoords = (
  { max = 9, min = 0 }: { max?: number; min?: number } = {},
): Coordinates => {
  const x = Math.floor(Math.random() * (max + 1 - min) + min);
  const y = Math.floor(Math.random() * (max + 1 - min) + min);

  return [x, y, 0];
};

const generateN = <T extends BaseThing>(
  { factory, n, args = {} }: {
    factory: (args: { position: Position }) => T;
    n: number;
    args?: Record<string, any>;
  },
): T[] => {
  const generated: T[] = [];

  for (let i = 0; i < n; i++) {
    const thing = factory({ position: generateRandomCoords(), ...args });
    generated.push(thing);
  }

  return generated;
};

const seed = () => {
  const blockContents: Block["contents"] = {};

  // TODO: instead of generating N trees and placing them in the grid
  // walk along each coordinate and decide whether or not a tree should grow there

  const trees = generateN({ factory: Tree.factory, n: 5 });
  const people = generateN({ factory: Person.factory, n: 3 });

  trees.forEach((tree) => blockContents[tree.id] = tree);
  people.forEach((person) => blockContents[person.id] = person);
  const block: Block = {
    contents: blockContents,
    coords: [0, 0],
  };

  save(block);
};

seed();

// seeds the world if none exists

// the data folder will have the structure:
/*
 * data
 *   - block1x1.json
 *   - block1x2.json
 *   - block2x1.json
 */

// but for now we will just worry about block 1x1
