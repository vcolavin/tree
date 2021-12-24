import { AllTypes } from "./AllTypes.ts";
export type Coordinates = [number, number, number];
export type UUID = string;
export type Position = Coordinates | UUID;

export interface BaseThing {
  position: Position;
  type: AllTypes;
  id: UUID;

  /** Symbol to be rendered */
  symbol?: string;
}

// can't get this stupid shit to work
// export type BaseFactory = <T extends BaseThing>(
//   args: { position: Position },
// ) => T;

// TODO: there may be things that don't need positions
// like concepts or memories, but we'll handle that later
