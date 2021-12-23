import { BaseThing } from "./BaseTypes.ts";

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
