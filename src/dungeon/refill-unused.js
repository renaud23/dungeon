import { getNeighbors, TILES, randomInt } from "./common";

function computeEmpties(dungeon) {
  const { origin } = dungeon;
  const stack = [origin];
  const empties = [];

  while (stack.length) {
    const current = stack.pop();
    empties.push(current);
    const disponibles = getVoisinsDisponibles(current, dungeon, empties);
    if (disponibles.length) {
      disponibles.forEach(function (pos) {
        stack.push(pos);
      });
    }
  }

  return empties;
}

function getVoisinsDisponibles(pos, dungeon, visited) {
  const { data, width } = dungeon;
  return getNeighbors(pos, width).filter(function (v) {
    return data[v] === TILES.GROUND && visited.indexOf(v) === -1;
  });
}

function filterDoors(dungeon) {
  const { doors, empties } = dungeon;
  const filteredDoors = doors.filter(function (pos) {
    return empties.indexOf(pos) !== -1;
  });

  return { ...dungeon, doors: filteredDoors };
}

function filterRooms(dungeon) {
  const { rooms, empties } = dungeon;
  const filteredRooms = rooms.reduce(function (a, room) {
    const { positions } = room;
    if (empties.indexOf(positions[randomInt(positions.length)]) === -1) {
      return a;
    }
    return [...a, room];
  }, []);

  return { ...dungeon, rooms: filteredRooms };
}

function filterWalls(dungeon) {
  const { data, empties } = dungeon;
  const filteredData = data.map(function (val, i) {
    if (empties.indexOf(i) !== -1) {
      return TILES.GROUND;
    }
    return TILES.WALL;
  });

  return { ...dungeon, data: filteredData };
}

function refill(dungeon) {
  const empties = computeEmpties(dungeon);
  return filterDoors(filterRooms(filterWalls({ ...dungeon, empties })));
}

export default refill;
