import { personUtils, Person } from "./Person";
import { Leaf, leafUtils, Limb, limbUtils, Tree, treeUtils } from "./Tree";

export type Thing = Person | Tree | Limb | Leaf;
export type ThingTypes = Thing["type"];

export const thingUtils = {
  [personUtils.type]: personUtils,
  [leafUtils.type]: leafUtils,
  [limbUtils.type]: limbUtils,
  [treeUtils.type]: treeUtils,
};
