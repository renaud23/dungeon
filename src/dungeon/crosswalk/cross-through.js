import { getNeighbors, TILES } from "../common";

function getVoisinsDisponibles(pos, dungeon, visited) {
  const { data, width } = dungeon;
  return getNeighbors(pos, width).filter(function (v) {
    return data[v] === TILES.GROUND && visited.indexOf(v) === -1;
  });
}

function defaultTodo(from, to, dungeon, step) {
  const { data } = dungeon;
  return data[to];
}

export function createRegionMap() {
  let numRegion = 2;
  return function doorsRegion(from, to, dungeon, step) {
    const { data, doors } = dungeon;

    if (doors.indexOf(to) !== -1) {
      numRegion++;
    }
    if (data[to] === TILES.GROUND) {
      return numRegion;
    }
    return TILES.GROUND;
  };
}

export function dijkstraMap(from, to, dungeon, step) {
  return step;
}

function cross(from, dungeon, todo = defaultTodo) {
  const { data } = dungeon;
  const stack = [from];
  const visited = [];
  const next = [...data];

  while (stack.length) {
    const current = stack.pop();
    const disponibles = getVoisinsDisponibles(current, dungeon, visited);
    if (disponibles.length) {
      disponibles.forEach(function (pos) {
        visited.push(pos);
        stack.push(pos);
        next[pos] = todo(current, pos, dungeon);
      });
    }
  }

  return { ...dungeon, data: next, start: from };
}

export default cross;
