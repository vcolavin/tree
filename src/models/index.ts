import { personUtils, Person } from "./Person";
import { Leaf, leafUtils, Limb, limbUtils, Tree, treeUtils } from "./Tree";

export type Thing = Person | Tree | Limb | Leaf;

export const thingUtils = [personUtils, leafUtils, treeUtils, limbUtils].reduce(
  (memo, util) => ({ ...memo, [util.type]: util }),
  {} as any
);
