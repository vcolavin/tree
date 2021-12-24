import { AllTypes } from "./AllTypes.ts";
import { BaseThing } from "./BaseThing.ts";

// TODO we need a way of getting a list of all thing types
// do not introduce hierarchies

export interface Leaf extends BaseThing {
  type: AllTypes.leaf;
}

export interface Limb extends BaseThing {
  type: AllTypes.limb;
  leaves: Leaf[];
}

export interface Tree extends BaseThing {
  type: AllTypes.tree;
  limbs: Limb[];
}

// lol that sounds kind of gross
export const treeTick = () => {
};
