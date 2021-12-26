import { v4 } from "uuid";

import { AllTypes } from "./AllTypes";
import { BaseFactory, BaseThing, Position } from "./BaseThing";

export namespace Leaf {
  export interface Interface extends BaseThing {
    type: AllTypes.leaf;
  }

  export const factory: BaseFactory<Interface> = ({
    position,
  }: {
    position: Position;
  }) => {
    const leaf: Interface = {
      type: AllTypes.leaf,
      position,
      id: v4(),
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

  export const factory: BaseFactory<Interface> = ({
    position,
  }: {
    position: Position;
  }): Interface => {
    const id = v4();

    return {
      type: AllTypes.limb,
      leaves: [Leaf.factory({ position: id })],
      position,
      id,
    };
  };
}

export namespace Tree {
  export interface Interface extends BaseThing {
    type: AllTypes.tree;
    limbs: Limb.Interface[];
  }

  export const factory: BaseFactory<Interface> = ({
    position,
  }: {
    position: Position;
  }): Interface => {
    const id = v4();

    return {
      type: AllTypes.tree,
      limbs: [Limb.factory({ position: id })],
      id,
      position,
    };
  };

  export const tick = (_tree: Interface) => {
    // do one action
    // probalistically grow a branch or something
    // .1% chance to die and create a log
  };
}
