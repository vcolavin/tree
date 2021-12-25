import { AllTypes } from "./AllTypes.ts";
import { BaseFactory, BaseThing, Position } from "./BaseThing.ts";

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
}
