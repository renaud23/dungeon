import { TILES } from "../common";
import { randomInt, getCoords } from "../common";

const DIRECTIONS = {
  north: 1,
  south: 2,
  east: 3,
  west: 4,
};

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

function canGo(pos, data, da, db) {
  const n1 = pos + da;
  const n2 = pos + da * 2;
  const positions = [n1, n2, n1 + db, n1 - db, n2 + db, n2 - db];
  const how = positions.reduce(function (a, next) {
    return a + data[next];
  }, 0);

  return how === 6;
}

function getNextPos(neighbors = [], direction) {
  if (neighbors.length) {
    const cdt = neighbors.find(function (n) {
      const [_, dir] = n;
      return dir === direction;
    });

    return cdt && randomInt(10) > 0
      ? cdt
      : neighbors[randomInt(neighbors.length)];
  }
  return undefined;
}

function getDirs(pos, data, width, height) {
  const dirs = [];
  const x = pos % width;
  const y = Math.trunc(pos / width);
  if (x < width - 2 && canGo(pos, data, 1, width)) {
    dirs.push([pos + 1, DIRECTIONS.east]);
  }
  if (y < height - 1 && canGo(pos, data, width, 1)) {
    dirs.push([pos + width, DIRECTIONS.south]);
  }
  if (x > 1 && canGo(pos, data, -1, width)) {
    dirs.push([pos - 1, DIRECTIONS.west]);
  }
  if (y > 0 && canGo(pos, data, -width, 1)) {
    dirs.push([pos - width, DIRECTIONS.north]);
  }

  return dirs;
}

export function carveMaze(pos, origin, width, height) {
  const maze = [...origin];
  const corridors = [];
  let currentPos = pos;
  let currentDir = undefined;
  let path = [];
  while (currentPos) {
    maze[currentPos] = TILES.GROUND;
    corridors.push(currentPos);
    let neighbors = getDirs(currentPos, maze, width, height);
    if (neighbors.length) {
      const [nextPos, nextDir] = getNextPos(neighbors, currentDir);
      // joinPos(currentPos, nextPos, maze, width);
      maze[nextPos] = TILES.GROUND;
      path.push(currentPos);
      currentDir = nextDir;
      currentPos = nextPos;
    } else if (path.length) {
      currentPos = path.pop();
    } else {
      currentPos = undefined;
    }
  }

  return { maze, corridors };
}

export default carveMaze;
