import { v4 } from "uuid";

import {
  BaseFactory,
  BaseThing,
  BaseTick,
  BaseUtils,
  Position,
} from "./BaseThing";

const leafType = "leaf" as const;

export interface Leaf extends BaseThing {
  type: typeof leafType;
}

const leafFactory: BaseFactory<Leaf> = ({
  position,
}: {
  position: Position;
}) => {
  const leaf: Leaf = {
    type: leafType,
    position,
    id: v4(),
  };

  return leaf;
};

export const leafUtils: BaseUtils<Leaf> = {
  type: leafType,
  factory: leafFactory,
};

const limbType = "limb" as const;

export interface Limb extends BaseThing {
  type: typeof limbType;
  leaves: Leaf[];
}

const limbFactory: BaseFactory<Limb> = ({
  position,
}: {
  position: Position;
}): Limb => {
  const id = v4();

  return {
    type: limbType,
    leaves: [leafUtils.factory({ position: id })],
    position,
    id,
  };
};

export const limbUtils: BaseUtils<Limb> = {
  type: limbType,
  factory: limbFactory,
};

const treeType = "tree" as const;

export interface Tree extends BaseThing {
  type: typeof treeType;
  limbs: Limb[];
}

const treeFactory: BaseFactory<Tree> = ({
  position,
}: {
  position: Position;
}): Tree => {
  const id = v4();

  return {
    type: treeType,
    limbs: [limbUtils.factory({ position: id })],
    id,
    position,
  };
};

const treeTick: BaseTick<Tree> = (_args) => {
  // do one action
  // probalistically grow a branch or something
  // .1% chance to die and create a log
  return undefined;
};

export const treeUtils: BaseUtils<Tree> = {
  type: treeType,
  tick: treeTick,
  factory: treeFactory,
};
