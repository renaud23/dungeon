import React from "react";
import { render } from "react-dom";
import DungeonRenderer from "./render/dungeon-rendering";

import { createDungeon, createMaze } from "./dungeon";

render(
  <DungeonRenderer dungeon={createDungeon(30, 30)} />,
  document.getElementById("root")
);
