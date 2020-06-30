import { randomInt } from "../common";

const TILES = {
  WALL: 1,
  GROUND: 0,
};

const DIRECTIONS = {
  north: 1,
  south: 2,
  east: 3,
  west: 4,
};

function canGo(pos, data, da, db) {
  const n1 = pos + da;
  const n2 = pos + da * 2;
  const positions = [n1, n2, n1 + db, n1 - db, n2 + db, n2 - db];
  const how = positions.reduce(function (a, next) {
    return a + data[next];
  }, 0);

  return how === 6;
}

function getDirs(pos, data, width, height) {
  const dirs = [];
  const x = pos % width;
  const y = Math.trunc(pos / width);
  if (x < width - 3 && canGo(pos, data, 1, width)) {
    dirs.push([pos + 2, DIRECTIONS.east]);
  }
  if (y < height - 3 && canGo(pos, data, width, 1)) {
    dirs.push([pos + 2 * width, DIRECTIONS.south]);
  }
  if (x > 2 && canGo(pos, data, -1, width)) {
    dirs.push([pos - 2, DIRECTIONS.west]);
  }
  if (y > 2 && canGo(pos, data, -width, 1)) {
    dirs.push([pos - 2 * width, DIRECTIONS.north]);
  }

  return dirs;
}

function getNextPos(neighbors = [], direction) {
  if (neighbors.length) {
    const cdt = neighbors.find(function (n) {
      const [_, dir] = n;
      return dir === direction;
    });

    return cdt && randomInt(10) > 9
      ? cdt
      : neighbors[randomInt(neighbors.length)];
  }
  return undefined;
}

function joinPos(start, end, data, width) {
  const ax = start % width;
  const ay = Math.trunc(start / width);
  const bx = end % width;
  const by = Math.trunc(end / width);
  data[start] = TILES.GROUND;
  if (start !== end && start && end) {
    const dx = bx - ax;
    const dy = by - ay;
    if (Math.abs(dx) > Math.abs(dy)) {
      joinPos(start + dx / Math.abs(dx), end, data, width);
    }
    joinPos(start + width * (dy / Math.abs(dy)), end, data, width);
  }
}

export function carveMaze(pos, origin, width, height) {
  const data = [...origin];
  let currentPos = pos;
  let currentDir = undefined;
  let path = [];
  while (currentPos) {
    data[currentPos] = TILES.GROUND;
    let neighbors = getDirs(currentPos, data, width, height);
    if (neighbors.length) {
      const [nextPos, nextDir] = getNextPos(neighbors, currentDir);
      joinPos(currentPos, nextPos, data, width);
      path.push(currentPos);
      currentDir = nextDir;
      currentPos = nextPos;
    } else if (path.length) {
      currentPos = path.pop();
    } else {
      currentPos = undefined;
    }
  }

  return data;
}

function createMaze(width, height) {
  const size = width * height;
  const data = carveMaze(
    width + 1,
    new Array(size).fill(TILES.WALL),
    width,
    height
  );
  return {
    getPos: (pos) => data[pos],
    getData: () => [...data],
    getHeight: () => height,
    getWidth: () => width,
    getSize: () => size,
  };
}

export default createMaze;
