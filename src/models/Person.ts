import { v4 } from "uuid";
import { Block, BlockContentDict } from "./Block";

import {
  BaseDescribe,
  BaseFactory,
  BaseThing,
  BaseTick,
  BaseUtils,
  getAdjacentPosition,
  isCoordinates,
  Position,
} from "./BaseThing";

const PersonType = "person" as const;

export interface Person extends BaseThing {
  type: typeof PersonType;
  name: string;
}

const factory: BaseFactory<Person> = ({ position }: { position: Position }) => {
  return {
    name: "O'Henry",
    position,
    id: v4(),
    type: PersonType,
  };
};

const tick: BaseTick<Person> = ({
  thing: person,
}: {
  thing: Person;
  block: Block;
}): BlockContentDict => {
  if (isCoordinates(person.position) && Math.random() > 0.75) {
    return {
      [person.id]: {
        ...person,
        position: getAdjacentPosition(person.position),
      },
    };
  }
};

const describe: BaseDescribe<Person> = (person) => {
  return `it is ${person.name}`;
};

export const personUtils: BaseUtils<Person> = {
  type: PersonType,
  factory,
  tick,
  symbol: "P",
  describe,
};
