import { personUtils, Person } from "./Person";

export const allThingUtils = {
  [personUtils.type]: personUtils,
};

export type AllThings = Person;
