(() => {
  // src/models/Block.ts
  var getEmptyRow = () => [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  var getEmptyLevel = () => [
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow()
  ];
  var getEmptyContentList = () => [
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel(),
    getEmptyLevel()
  ];
  var generateList = (blockDict) => {
    const thing = Object.values(blockDict).filter((thing2) => typeof thing2.position !== "string").reduce((memo, thing2) => {
      const [x, y, z] = thing2.position;
      memo[z][x][y].push(thing2.id);
      return memo;
    }, getEmptyContentList());
    return thing;
  };
  var save = ({ coords, contentDict }) => {
    const blockName = `${coords[0]}x${coords[1]}`;
    const content = JSON.stringify(contentDict);
    localStorage.setItem(blockName, content);
  };

  // src/models/AllTypes.ts
  var AllTypes = /* @__PURE__ */ ((AllTypes2) => {
    AllTypes2["person"] = "person";
    AllTypes2["tree"] = "tree";
    AllTypes2["limb"] = "limb";
    AllTypes2["leaf"] = "leaf";
    return AllTypes2;
  })(AllTypes || {});

  // src/Render.ts
  var render = ({
    block: { contentList, contentDict },
    zLevel,
    tickCount = 0
  }) => {
    const level = contentList[zLevel];
    level.forEach((row) => {
      const constructedRow = row.map((col) => {
        const thingId = col[tickCount % col.length];
        return getSymbol({ thingId, contentDict }) ?? " ";
      });
      console.log(constructedRow.join(" "));
    });
  };
  var getSymbol = ({
    thingId,
    contentDict
  }) => {
    if (!thingId) {
      return void 0;
    }
    switch (contentDict[thingId]?.type) {
      case "person" /* person */:
        return "P";
      case "tree" /* tree */:
        return "T";
      default:
        return void 0;
    }
  };

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  var i;
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var stringify_default = stringify;

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default = v4;

  // src/models/Tree.ts
  var Leaf;
  ((Leaf2) => {
    Leaf2.factory = ({
      position
    }) => {
      const leaf = {
        type: "leaf" /* leaf */,
        position,
        id: v4_default()
      };
      return leaf;
    };
    Leaf2.tick = (_leaf) => {
    };
  })(Leaf || (Leaf = {}));
  var Limb;
  ((Limb2) => {
    Limb2.factory = ({
      position
    }) => {
      const id = v4_default();
      return {
        type: "limb" /* limb */,
        leaves: [Leaf.factory({ position: id })],
        position,
        id
      };
    };
  })(Limb || (Limb = {}));
  var Tree;
  ((Tree2) => {
    Tree2.factory = ({
      position
    }) => {
      const id = v4_default();
      return {
        type: "tree" /* tree */,
        limbs: [Limb.factory({ position: id })],
        id,
        position
      };
    };
    Tree2.tick = (_tree) => {
    };
  })(Tree || (Tree = {}));

  // src/models/Person.ts
  var Person;
  ((Person2) => {
    Person2.factory = ({
      position
    }) => {
      return {
        name: "O'Henry",
        position,
        id: v4_default(),
        type: "person" /* person */
      };
    };
    Person2.tick = (person) => {
      if (typeof person.position !== "string" && Math.random() > 0.75) {
        return { ...person, position: getAdjacentPosition(person.position) };
      }
      return person;
    };
  })(Person || (Person = {}));
  var adjacentPositionModifiers = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ];
  var getAdjacentPosition = ([x, y, z]) => {
    const [xMod, yMod] = adjacentPositionModifiers[Math.floor(Math.random() * adjacentPositionModifiers.length)];
    return [x + xMod, y + yMod, z];
  };

  // src/seed.ts
  var generateRandomCoords = ({
    max = 9,
    min = 0
  } = {}) => {
    const x = Math.floor(Math.random() * (max + 1 - min) + min);
    const y = Math.floor(Math.random() * (max + 1 - min) + min);
    return [x, y, 0];
  };
  var generateN = ({
    factory,
    n,
    args = {}
  }) => {
    const generated = [];
    for (let i = 0; i < n; i++) {
      const thing = factory({ position: generateRandomCoords(), ...args });
      generated.push(thing);
    }
    return generated;
  };
  var seed = () => {
    const contentDict = {};
    const trees = generateN({ factory: Tree.factory, n: 5 });
    const people = generateN({ factory: Person.factory, n: 3 });
    trees.forEach((tree) => contentDict[tree.id] = tree);
    people.forEach((person) => contentDict[person.id] = person);
    const block = {
      contentDict,
      contentList: generateList(contentDict),
      coords: [0, 0]
    };
    save(block);
  };
  seed();

  // src/index.ts
  var initialize = () => {
    const fileContent = localStorage.getItem("block0x0");
    const contentDict = JSON.parse(fileContent);
    if (!contentDict) {
      seed();
    }
    const block = {
      coords: [0, 0],
      contentDict,
      contentList: generateList(contentDict)
    };
    mainLoop(block);
  };
  var mainLoop = async (block) => {
    let tickCount = 0;
    while (++tickCount) {
      console.clear();
      render({ block, zLevel: 0, tickCount });
      await new Promise((resolve) => {
        setTimeout(resolve, 1e3);
      });
    }
  };
  initialize();
})();
