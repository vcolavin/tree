import { Block, BlockContentDict, generateList, save } from "./models/Block";
import { Tree } from "./models/Tree";
import { Person } from "./models/Person";
import { BaseFactory, BaseThing, Coordinates } from "./models/BaseThing";

const generateRandomCoords = ({
  max = 9,
  min = 0,
}: { max?: number; min?: number } = {}): Coordinates => {
  const x = Math.floor(Math.random() * (max + 1 - min) + min);
  const y = Math.floor(Math.random() * (max + 1 - min) + min);

  return [x, y, 0];
};

const generateN = <T extends BaseThing>({
  factory,
  n,
  args = {},
}: {
  factory: BaseFactory<T>;
  n: number;
  args?: Record<string, any>;
}): T[] => {
  const generated: T[] = [];

  for (let i = 0; i < n; i++) {
    const thing = factory({ position: generateRandomCoords(), ...args });
    generated.push(thing);
  }

  return generated;
};

export const seed = () => {
  const contentDict: BlockContentDict = {};

  const trees = generateN({ factory: Tree.factory, n: 5 });
  const people = generateN({ factory: Person.factory, n: 3 });

  trees.forEach((tree) => (contentDict[tree.id] = tree));
  people.forEach((person) => (contentDict[person.id] = person));
  const block: Block = {
    contentDict,
    contentList: generateList(contentDict),
    coords: [0, 0],
  };

  save(block);
};

seed();
