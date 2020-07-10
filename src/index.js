import React from "react";
import { render } from "react-dom";
import DungeonRenderer from "./render/dungeon-rendering";
import findRegions from "./dungeon/crosswalk/find-region";
import { randomRoomPos } from "./dungeon/common";
import { createDungeon } from "./dungeon";

function initDungeon() {
  const dungeon = createDungeon(100, 100);
  const { rooms } = dungeon;

  return findRegions(dungeon, randomRoomPos(rooms));
}

const dungeon = initDungeon();

function App({ dungeon }) {
  return <DungeonRenderer dungeon={dungeon} />;
}

render(<App dungeon={dungeon} />, document.getElementById("root"));
