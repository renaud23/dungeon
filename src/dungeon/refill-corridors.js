import { TILES, getNeighbors, randomRoomPos } from "./common";

function isClosed(pos, data, width) {
  const how = getNeighbors(pos, width).reduce(function (a, p) {
    return a + data[p];
  }, 0);

  return how >= 3;
}

function refill(rooms, data, width, height) {
  const start = randomRoomPos(rooms);
  const next = [...data];
  const stack = [start];

  const path = [];
  const visited = [];

  while (stack.length) {
    const current = stack.pop();
    visited.push(current);

    if (isClosed(current, next, width)) {
      next[current] = TILES.WALL;
      if (path.length) {
        stack.push(path.pop());
      }
    } else {
      path.push(current);
      getNeighbors(current, width).forEach(function (pos) {
        if (next[pos] === TILES.GROUND && visited.indexOf(pos) === -1) {
          stack.push(pos);
        }
      });
    }
  }

  return { data: next, visited };
}

export default refill;
