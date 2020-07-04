import React from "react";
import { render } from "react-dom";
import DungeonRenderer from "./render/dungeon-rendering";

import { createDungeon } from "./dungeon";

render(
  <DungeonRenderer dungeon={createDungeon(70, 50)} />,
  document.getElementById("root")
);
