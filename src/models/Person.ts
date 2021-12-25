import { AllTypes } from "./AllTypes.ts";
import { BaseFactory, BaseThing, Coordinates, Position } from "./BaseThing.ts";

export namespace Person {
  export interface Interface extends BaseThing {
    type: AllTypes.person;
    name: string;
  }

  export const factory: BaseFactory<Interface> = (
    { position }: { position: Position },
  ) => {
    return {
      name: "O'Henry",
      position,
      id: crypto.randomUUID(),
      type: AllTypes.person,
    };
  };

  export const tick = (person: Interface): Interface => {
    if (typeof person.position !== "string" && Math.random() > 0.75) {
      return { ...person, position: getAdjacentPosition(person.position) };
    }

    return person;
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
  const [xMod, yMod] = adjacentPositionModifiers[
    Math.floor(Math.random() * adjacentPositionModifiers.length)
  ];

  return [x + xMod, y + yMod, z];
};
