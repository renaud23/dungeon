import { TILES, getCoords, randomInt, isTotallyWalled } from "./common";

function needEnlarging(position, data, da, db) {
  if (
    // pos - 1 = pos + da
    data[position] === TILES.WALL &&
    data[position + da] === TILES.WALL &&
    data[position + da - db] === TILES.WALL &&
    data[position + da + db] === TILES.WALL
  ) {
    return true;
  }
  return false;
}

function getPossibles(position, data, width, height) {
  const [x, y] = getCoords(position, width);
  const witch = [];

  if (x > 2 && x < width - 2 && y > 0 && y < height - 1) {
    if (needEnlarging(position - 1, data, -1, width)) {
      witch.push(position - 1);
    }
    if (needEnlarging(position + 1, data, 1, width)) {
      witch.push(position + 1);
    }
  }
  if (x > 0 && x < width - 1 && y > 2 && y < height - 2) {
    if (needEnlarging(position + width, data, width, 1)) {
      witch.push(position + width);
    }
    if (needEnlarging(position - width, data, -width, 1)) {
      witch.push(position - width);
    }
  }

  return witch;
}

function enlargedIt(positions, data, width, height) {
  let next = [...data];
  let nextPositions = [...positions];
  while (positions.length) {
    const current = positions.pop();
    getPossibles(current, next, width, height).forEach(function (p) {
      next[p] = TILES.GROUND;
    });
  }
  return [next, nextPositions];
}

function enlargedRoom(room, data, width, height) {
  const [x, y, w, h] = room;

  const [next, nextRoom] = enlargedIt(room, data, width, height);

  return { data: next, room: nextRoom };
}

function enlargedRooms(rooms, data, width, height) {
  return rooms.reduce(
    function (a, room) {
      const { data: current, rooms } = a;
      const { data: next, room: nextRoom } = enlargedRoom(
        room,
        current,
        width,
        height
      );
      return { data: next, rooms: [...rooms, nextRoom] };
    },
    { data, rooms: [] }
  );
}

export default enlargedRooms;
