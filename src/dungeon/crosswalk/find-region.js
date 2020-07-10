import { getNeighbors, TILES, randomRoomPos } from "../common";

function getVoisins(position, dungeon, visited) {
  const { data, width, doors } = dungeon;
  return getNeighbors(position, width).filter(function (pos) {
    return (
      data[pos] === TILES.GROUND &&
      visited.indexOf(pos) === -1 &&
      doors.indexOf(pos) === -1
    );
  });
}

function findDoors(position, doors, visited, width) {
  return getNeighbors(position, width).filter(function (pos) {
    return doors.indexOf(pos) !== -1 && visited.indexOf(pos) === -1;
  });
}

function findThem(pos, dungeon, doorsLeft, visited = []) {
  const { width } = dungeon;
  const stack = [pos];
  const positions = [];
  const exits = [];

  while (stack.length) {
    const current = stack.pop();
    positions.push(current);
    visited.push(current);
    const disponibles = getVoisins(current, dungeon, visited);

    findDoors(current, doorsLeft, visited, width).forEach(function (pos) {
      if (exits.indexOf(pos) === -1) {
        exits.push(pos);
      }
    });

    if (disponibles.length) {
      disponibles.forEach(function (pos) {
        stack.push(pos);
      });
    }
  }

  const zones = [{ positions: positions.slice(1), exits }].filter(function ({
    positions,
  }) {
    return positions.length > 0;
  });

  if (exits.length) {
    const doorsClean = doorsLeft.reduce(function (a, d) {
      if (exits.indexOf(d) === -1) {
        return [...a, d];
      }
      return a;
    }, []);
    return exits.reduce(function (a, exit) {
      return [...a, ...findThem(exit, dungeon, doorsClean, visited)];
    }, zones);
  }

  return zones;
}

function find(dungeon) {
  const { rooms, doors } = dungeon;
  const start = randomRoomPos(rooms);
  const zones = findThem(start, dungeon, doors);
  return { ...dungeon, regions: { start, zones } };
}

export default find;
