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

function drawZones(dungeon, offscreen, size) {
  const { width, height, regions } = dungeon;
  const { zones } = regions;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;
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
}

function drawWalls(dungeon, offscreen, size) {
  const { width, height, data, refilled = [] } = dungeon;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;
  data.forEach(function (t, i) {
    const x = i % width;
    const y = Math.trunc(i / width);
    //
    if (t === 1) {
      offscreen.fillRect("blue", x * car, y * car, car, car);
    }
  });
  refilled.forEach(function (i) {
    const x = i % width;
    const y = Math.trunc(i / width);
    //

    offscreen.fillRect("pink", x * car + 1, y * car + 1, car - 1, car - 1);
  });
}

function drawRooms(dungeon, offscreen, size) {
  const { width, height, rooms } = dungeon;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;
  rooms.forEach(function (room, i) {
    const { positions } = room;

    positions.forEach(function (i) {
      const x = i % width;
      const y = Math.trunc(i / width);
      offscreen.fillRect("white", x * car, y * car, car, car);
    });
  });
}

function drawDoors(dungeon, offscreen, size) {
  const { width, height, doors } = dungeon;
  const car =
    Math.min(Math.trunc(size / width), Math.trunc(size / height)) || 1;

  doors.forEach(function (i) {
    const x = i % width;
    const y = Math.trunc(i / width);
    offscreen.fillRect("red", x * car, y * car, car, car);
  });
}

function drawDungeon(dungeon, offscreen, size) {
  drawRooms(dungeon, offscreen, size);
  drawWalls(dungeon, offscreen, size);
  drawDoors(dungeon, offscreen, size);
}

function Canvas({ dungeon, size = 500, renderer = drawDungeon }) {
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
        renderer(dungeon, offscreen, size);
        offscreen.render();
      }
    },
    [dungeon, offscreen, renderer, size]
  );

  return <canvas ref={canvas} />;
}

function DungeonRenderer({ dungeon }) {
  return (
    <div>
      <Canvas dungeon={dungeon} size={300} />
      <Canvas dungeon={dungeon} size={200} renderer={drawZones} />
    </div>
  );
}

export default DungeonRenderer;
