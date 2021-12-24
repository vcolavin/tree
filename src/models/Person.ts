import { AllTypes } from "./AllTypes.ts";
import { BaseThing, Position } from "./BaseThing.ts";

export namespace Person {
  export interface Interface extends BaseThing {
    type: AllTypes.person;
    name: string;
  }

  export const factory = (
    { position }: { position: Position },
  ): Interface => {
    return {
      name: "O'Henry",
      position,
      id: crypto.randomUUID(),
      type: AllTypes.person,
    };
  };
}
