import { randomInt } from "../common";

const TILES = {
  WALL: 1,
  GROUND: 0,
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

function randomDir(pos, data, width, height) {
  const dirs = [];
  const x = pos % width;
  const y = Math.trunc(pos / width);
  if (x < width - 2 && canGo(pos, data, 1, width)) {
    dirs.push(pos + 1);
  }
  if (y < height - 2 && canGo(pos, data, width, 1)) {
    dirs.push(pos + width);
  }
  if (x > 1 && canGo(pos, data, -1, width)) {
    dirs.push(pos - 1);
  }
  if (y > 1 && canGo(pos, data, -width, 1)) {
    dirs.push(pos - width);
  }

  return dirs.length ? dirs[randomInt(dirs.length)] : undefined;
}

function carve(pos, data, width, height) {
  data[pos] = TILES.GROUND;

  let nextPos = randomDir(pos, data, width, height);
  while (nextPos) {
    carve(nextPos, data, width, height);
    nextPos = randomDir(pos, data, width, height);
  }

  return data;
}

function createMaze(width, height) {
  const size = width * height;
  const data = carve(
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
