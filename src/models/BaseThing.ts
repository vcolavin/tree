import { AllTypes } from "./AllTypes";
import { Block, BlockContentDict } from "./Block";
import { Person } from "./Person";
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
  type: AllTypes;
  id: UUID;
}

export type BaseFactory<T extends BaseThing> = (args: {
  position: Position;
}) => T;

export type BaseTick<T extends BaseThing> = (args: {
  thing: T;
  block: Block;
}) => BlockContentDict | undefined;

export const tick = (args: {
  thing: BaseThing;
  block: Block;
}): BlockContentDict | undefined => {
  switch (args.thing.type) {
    case AllTypes.person:
      return Person.tick(args as Parameters<typeof Person.tick>[0]);
    default:
      return undefined;
  }
};
