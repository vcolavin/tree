import { Block, BlockContentDict } from "./Block";
export type Coordinates = [number, number, number];
export type UUID = string;
export type Position = Coordinates | UUID;

export const isCoordinates = (position: Position): position is Coordinates =>
  typeof position !== "string";

export interface BaseThing {
  // TODO: there may be things that don't need positions
  // like concepts or memories or rivers (which occupy many positions),
  // but we'll handle that later
  position: Position;
  type: string;
  id: UUID;
}

export interface BaseUtils<T extends BaseThing> {
  type: T["type"];
  factory: BaseFactory<T>;
  tick?: BaseTick<T>;
  symbol?: string;
}

export type BaseFactory<T extends BaseThing> = (args: {
  position: Position;
}) => T;

export type BaseTick<T extends BaseThing> = (args: {
  thing: T;
  block: Block;
}) => BlockContentDict | undefined;

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

export const getAdjacentPosition = ([x, y, z]: Coordinates): Coordinates => {
  const [xMod, yMod] =
    adjacentPositionModifiers[
      Math.floor(Math.random() * adjacentPositionModifiers.length)
    ];

  // ensure no one goes off the edge of the map
  const newX = Math.min(9, Math.max(0, x + xMod));
  const newY = Math.min(9, Math.max(0, y + yMod));

  return [newX, newY, z];
};
