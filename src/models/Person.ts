import { AllTypes } from "./AllTypes.ts";
import { BaseThing, Coordinates } from "./BaseThing.ts";

export namespace Person {
  export interface Interface extends BaseThing {
    type: AllTypes.person;
    name: string;
  }

  export const factory = (
    { position }: { position: Coordinates },
  ): Interface => {
    return {
      name: "O'Henry",
      position,
      id: crypto.randomUUID(),
      type: AllTypes.person,
    };
  };
}
