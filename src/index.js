import React from "react";
import { render } from "react-dom";
import DungeonRenderer from "./render/dungeon-rendering";
import { createMaze } from "./dungeon";

render(
  <DungeonRenderer dungeon={createMaze(100, 100)} />,
  document.getElementById("root")
);
