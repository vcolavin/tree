export type Coordinates = [number, number, number];
export type UUID = string;
export type Position = Coordinates | UUID;

export interface BaseThing {
  position: Position;
  type: string;
  id: UUID;
}

// TODO: there may be things that don't need positions
// like concepts or memories, but we'll handle that later
