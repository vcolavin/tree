import { personUtils, Person } from "./Person";
import { Leaf, leafUtils, Limb, limbUtils, Tree, treeUtils } from "./Tree";

export const allThingUtils = {
  [personUtils.type]: personUtils,
  [leafUtils.type]: leafUtils,
  [treeUtils.type]: treeUtils,
  [limbUtils.type]: limbUtils,
};

export type AllThings = Person | Tree | Limb | Leaf;
