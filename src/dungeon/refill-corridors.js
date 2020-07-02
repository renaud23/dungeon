import { TILES, randomInt, getNeighbors } from "./common";

function randomPos(rooms) {
  const room = rooms[randomInt(rooms.length)];
  return room[randomInt(room.length)];
}

function isClosed(pos, data, width) {
  const how = getNeighbors(pos, width).reduce(function (a, p) {
    return a + data[p];
  }, 0);

  return how >= 3;
}

function refill(rooms, data, width, height) {
  const start = randomPos(rooms);
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

    // if (isClosed(current, next, width)) {
    //   next[current] = TILES.WALL;
    //   if (path.length) {
    //     current = path.pop();
    //   }
    // } else {
    //   path.push(current);
    //   current = getNeighbors(current, width).find(function (pos) {
    //     return next[pos] === TILES.GROUND && visited.indexOf(pos) === -1;
    //   });
    //   if (!current && path.length) {
    //     current = path.pop();
    //   }
    // }
  }

  return { data: next, visited };
}

export default refill;
