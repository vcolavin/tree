import { AllTypes } from "./AllTypes";
export type Coordinates = [number, number, number];
export type UUID = string;
export type Position = Coordinates | UUID;

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
