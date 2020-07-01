import React from "react";
import { render } from "react-dom";
import DungeonRenderer from "./render/dungeon-rendering";

import { createDungeon, createMaze } from "./dungeon";

render(
  <DungeonRenderer dungeon={createDungeon(50, 50)} />,
  document.getElementById("root")
);
