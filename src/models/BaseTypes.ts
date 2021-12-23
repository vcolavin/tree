export type Position = [number, number, number];

export interface BaseThing {
  position?: Position | BaseThing;
  type: string;
  id: string;
}
