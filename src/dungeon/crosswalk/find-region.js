import { getNeighbors, TILES, randomRoomPos, randomInt } from "../common";

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

function removeUsedDoors(doors, exits) {
  return doors.reduce(function (a, d) {
    if (exits.indexOf(d) === -1) {
      return [...a, d];
    }
    return a;
  }, []);
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

  const zones = [{ positions: positions.slice(1), exits, roomIndex: -1 }];
  // .filter(function ({ positions }) {
  //   return positions.length > 0;
  // });

  if (exits.length) {
    const doorsClean = removeUsedDoors(doorsLeft, exits);
    return exits.reduce(function (a, exit) {
      return [...a, ...findThem(exit, dungeon, doorsClean, visited)];
    }, zones);
  }

  return zones;
}

function removeDeadZones(zones) {
  return zones.filter(function (zone) {
    const { positions } = zone;
    return positions.length > 0;
  });
}

function lookForIndex(zone, rooms) {
  const { positions } = zone;
  const witch = positions[randomInt(positions.length)];
  return rooms.reduce(function (a, room, i) {
    if (room.positions.indexOf(witch) !== -1) {
      return i;
    }

    return a;
  }, -1);
}

function findRoom(zones, rooms) {
  return zones.map(function (zone) {
    const roomIndex = lookForIndex(zone, rooms);
    return { ...zone, roomIndex };
  });
}

function find(dungeon) {
  const { rooms, doors } = dungeon;
  const start = randomRoomPos(rooms);
  const zones = findRoom(
    removeDeadZones(findThem(start, dungeon, doors)),
    rooms
  );

  return { ...dungeon, regions: { start, zones } };
}

export default find;
