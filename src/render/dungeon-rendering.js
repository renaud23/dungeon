import React, { useEffect, useRef, useState } from "react";
import createOffscreen from "./rendering";

function drawDungeon(dungeon, offscreen, size) {
  const { width, height } = dungeon;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;

  // dungeon.data.forEach(function (t, i) {
  //   const x = i % width;
  //   const y = Math.trunc(i / width);
  //   offscreen.fillRect("blue", x * car + 1, y * car + 1, car - 2, car - 2);
  // });

  dungeon.data.forEach(function (t, i) {
    const x = i % width;
    const y = Math.trunc(i / width);
    if (t === 0) {
      offscreen.fillRect("magenta", x * car, y * car, car, car);
    } else {
      offscreen.fillRect("blue", x * car, y * car, car, car);
    }
  });

  dungeon.doors.forEach(function (pos) {
    const x = pos % width;
    const y = Math.trunc(pos / width);
    offscreen.fillRect("yellow", x * car + 1, y * car + 1, car - 2, car - 2);
  });

  // dungeon.rooms.forEach(function (room) {
  //   room.forEach(function (pos) {
  //     const x = pos % width;
  //     const y = Math.trunc(pos / width);
  //     offscreen.fillRect("green", x * car, y * car, car, car);
  //   });
  // });

  // dungeon.visited.forEach(function (i) {
  //   const x = i % width;
  //   const y = Math.trunc(i / width);
  //   offscreen.fillRect("orange", x * car + 1, y * car + 1, car - 2, car - 2);
  // });
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
