import React, { useEffect, useRef, useState } from "react";
import createOffscreen from "./rendering";

function drawDungeon(dungeon, offscreen, size) {
  const width = dungeon.getWidth();
  const height = dungeon.getHeight();
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;

  dungeon.getData().forEach(function (t, i) {
    if (t === 1) {
      const x = i % width;
      const y = Math.trunc(i / width);
      offscreen.fillRect("yellow", x * car, y * car, car, car);
    }
  });
}

function DungeonRenderer({ dungeon }) {
  const size = 500;
  const canvas = useRef(null);
  const [offscreen, setOffscreen] = useState(null);

  useEffect(
    function () {
      if (canvas.current) {
        setOffscreen(createOffscreen(canvas.current, size, size));
      }
    },
    [canvas, size]
  );

  useEffect(
    function () {
      if (dungeon && offscreen) {
        offscreen.clear();
        drawDungeon(dungeon, offscreen, size);
        offscreen.render();
      }
    },
    [dungeon, offscreen]
  );

  return <canvas ref={canvas} />;
}

export default DungeonRenderer;
