import computeRects from "./compute-rect";
import { TILES, getCoords, isInRect, randomInt } from "../common";

function isInRoom(i, rooms) {
  return rooms.reduce(function (a, room) {
    return a || room.indexOf(i) !== -1;
  }, false);
}

export function carveRooms(rooms, data, width) {
  return data.map(function (a, i) {
    if (isInRoom(i, rooms)) {
      return TILES.GROUND;
    }
    return a;
  });
}

function computeRoomPosition(room, width) {
  const [x, y, w, h] = room;
  return new Array(w * h).fill(0).map(function (_, i) {
    const [xi, yi] = getCoords(i, w);
    return x + xi + (y + yi) * width;
  });
}

function carve(data, width, height) {
  const rects = computeRects([1, 1, width - 1, height - 1]);
  const rooms = rects.map(function (rect) {
    const [x, y, w, h] = rect;
    const wi = Math.trunc(w / 2 + randomInt(w / 2));
    const xi = Math.trunc(x + (w - wi) / 2);

    const hi = Math.trunc(h / 2 + randomInt(h / 2));
    const yi = Math.trunc(y + (h - hi) / 2);

    return computeRoomPosition([xi, yi, wi, hi], width);
  });

  const next = carveRooms(rooms, data, width);

  return { data: next, rooms };
}

export default carve;
