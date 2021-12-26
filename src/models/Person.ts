import { v4 } from "uuid";
import { Block, BlockContentDict } from "./Block";
import { AllTypes } from "./AllTypes";
import {
  BaseFactory,
  BaseThing,
  BaseTick,
  Coordinates,
  Position,
} from "./BaseThing";

export namespace Person {
  export interface Interface extends BaseThing {
    type: AllTypes.person;
    name: string;
  }

  export const factory: BaseFactory<Interface> = ({
    position,
  }: {
    position: Position;
  }) => {
    return {
      name: "O'Henry",
      position,
      id: v4(),
      type: AllTypes.person,
    };
  };

  export const tick: BaseTick = ({
    thing: person,
  }: {
    thing: Interface;
    block: Block;
  }): BlockContentDict => {
    if (typeof person.position !== "string" && Math.random() > 0.75) {
      return {
        [person.id]: {
          ...person,
          position: getAdjacentPosition(person.position),
        },
      };
    }

    return {};
  };
}

const adjacentPositionModifiers: [number, number][] = [
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const getAdjacentPosition = ([x, y, z]: Coordinates): Coordinates => {
  const [xMod, yMod] =
    adjacentPositionModifiers[
      Math.floor(Math.random() * adjacentPositionModifiers.length)
    ];

  // ensure no one goes off the edge of the map
  const newX = Math.min(9, Math.max(0, x + xMod));
  const newY = Math.min(9, Math.max(0, y + yMod));

  return [newX, newY, z];
};
