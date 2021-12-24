import { AllTypes } from "./AllTypes.ts";
import { BaseFactory, BaseThing, Coordinates, Position } from "./BaseThing.ts";

export namespace Leaf {
  export interface Interface extends BaseThing {
    type: AllTypes.leaf;
  }

  export const factory = (
    { position }: { position: Position },
  ): Interface => {
    const leaf: Interface = {
      type: AllTypes.leaf,
      position,
      id: crypto.randomUUID(),
    };

    return leaf;
  };

  export const tick = (_leaf: Interface) => {
    // might could fall to the ground!
    // in which case its position becomes the tree's position
  };
}

export namespace Limb {
  export interface Interface extends BaseThing {
    type: AllTypes.limb;
    leaves: Leaf.Interface[];
  }

  export const factory = (
    { position }: { position: Position },
  ): Interface => {
    const id = crypto.randomUUID();

    return ({
      type: AllTypes.limb,
      leaves: [Leaf.factory({ position: id })],
      position,
      id,
    });
  };
}

export namespace Tree {
  export interface Interface extends BaseThing {
    type: AllTypes.tree;
    limbs: Limb.Interface[];
  }

  export const factory = (
    { position }: { position: Position },
  ): Interface => {
    const id = crypto.randomUUID();

    return {
      type: AllTypes.tree,
      limbs: [Limb.factory({ position: id })],
      id,
      position,
    };
  };

  export const tick = (_tree: Interface) => {
    // do one action
  };
}
