import React, { useEffect, useRef, useState } from "react";
import { getCoords } from "../dungeon/common";
import createOffscreen from "./rendering";

function getColor(i) {
  if (i === 0) {
    return "green";
  }
  if (i === 1) {
    return "orange";
  }
  const red = Math.min(255, 50 + i * 20);
  const green = Math.min(255, Math.max(i * 20 - 255, 0));
  const blue = Math.min(255, Math.max(i * 20 - 255 * 2, 0));

  return `rgb(${red}, ${green}, ${blue})`;
}

function drawDungeon(dungeon, offscreen, size) {
  const { width, height } = dungeon;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;

  // dungeon.data.forEach(function (t, i) {
  //   const x = i % width;
  //   const y = Math.trunc(i / width);
  //   offscreen.fillRect("blue", x * car + 1, y * car + 1, car - 2, car - 2);
  // });

  // dungeon.data.forEach(function (t, i) {
  //   const [x, y] = getCoords(i, width);
  //   if (t === 0) {
  //     offscreen.fillRect("magenta", x * car, y * car, car, car);
  //   } else {
  //     offscreen.fillRect("blue", x * car, y * car, car, car);
  //   }
  // });

  // dungeon.special.forEach(function (value, i) {
  //   const [x, y] = getCoords(i, width);

  //   if (value >= 2) {
  //     const color = `rgb(100,${50 + (value - 2) * 20},50)`;
  //     offscreen.fillRect(color, x * car, y * car, car, car);
  //   }
  // });

  // dungeon.doors.forEach(function (pos) {
  //   const [x, y] = getCoords(pos, width);
  //   offscreen.fillRect("yellow", x * car + 1, y * car + 1, car - 2, car - 2);
  // });

  const { start, zones } = dungeon.regions;

  zones.forEach(function (region, i) {
    const color = getColor(i);
    const { positions, exits } = region;
    positions.forEach(function (pos) {
      const [x, y] = getCoords(pos, width);
      offscreen.fillRect(color, x * car, y * car, car, car);
    });
    exits.forEach(function (pos) {
      const [x, y] = getCoords(pos, width);
      offscreen.fillRect(color, x * car + 1, y * car + 1, car - 2, car - 2);
    });
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
