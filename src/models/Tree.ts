import { BaseThing } from "./BaseTypes.ts";

// TODO we need a way of getting a list of all thing types
// do not introduce hierarchies

export interface Leaf extends BaseThing {
  type: "leaf";
}

export interface Limb extends BaseThing {
  type: "limb";
  leaves: Leaf[];
}

export interface Tree extends BaseThing {
  type: "tree";
  limbs: Limb[];
}
