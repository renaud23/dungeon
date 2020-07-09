import { TILES, randomInt, isInBound, getNeighbors } from "./common";

function filledRooms(rooms, data, width) {
  return data.map(function (value, i) {
    const nv = rooms.reduce(function (a, room, j) {
      if (room.indexOf(i) !== -1) {
        return j + 10;
      }
      return a;
    }, undefined);

    return nv || value;
  });
}

function isConnector(pos, data, width, height) {
  if (isInBound(pos, width, height)) {
    if (
      data[pos] === TILES.WALL &&
      data[pos - 1] !== TILES.WALL &&
      data[pos + 1] !== TILES.WALL &&
      data[pos - 1] !== data[pos + 1]
    ) {
      return true;
    }
    if (
      data[pos] === TILES.WALL &&
      data[pos - width] !== TILES.WALL &&
      data[pos + width] !== TILES.WALL &&
      data[pos - width] !== data[pos + width]
    ) {
      return true;
    }
  }

  return false;
}

function findConnectors(data, width, height) {
  return data.reduce(function (a, v, i) {
    if (isConnector(i, data, width, height)) {
      return [...a, i];
    }
    return a;
  }, []);
}

function getConnectorsNear(pos, connectors, width) {
  return getNeighbors(pos, width).reduce(function (a, nb) {
    if (connectors.indexOf(nb) !== -1) {
      return [...a, nb];
    }
    return a;
  }, []);
}

function openRoom(room, connectors, data, width) {
  const conns = room.reduce(function (a, pos) {
    return [...a, ...getConnectorsNear(pos, connectors, width)];
  }, []);
  if (conns.length) {
    const next = [...data];
    const doors = [];

    new Array(1 + randomInt(2)).fill(0).forEach(function (c) {
      const witch = conns[randomInt(conns.length)];
      next[witch] = TILES.GROUND;
      doors.push(witch);
    });

    const leftConns = connectors.reduce(function (a, c) {
      if (conns.indexOf(c) !== -1) {
        return a;
      }
      return [...a, c];
    }, []);
    return [next, leftConns, doors];
  }

  return [data, connectors, []];
}

function openDoors(
  rooms,
  connectors,
  data,
  width,
  height,
  precedentDoors = [],
  roomsWithDoors = []
) {
  const [room, ...leftRooms] = rooms;
  const [next, leftConns, doors] = openRoom(room, connectors, data, width);
  const nextRoom = { positions: room, doors };
  if (!leftRooms.length) {
    return [next, [...precedentDoors, ...doors], [...roomsWithDoors, nextRoom]];
  }

  return openDoors(
    leftRooms,
    leftConns,
    next,
    width,
    height,
    [...precedentDoors, ...doors],
    [...roomsWithDoors, nextRoom]
  );
}

function carve(rooms, data, width, height) {
  const filled = filledRooms(rooms, data, width);
  const connectors = findConnectors(filled, width, height);
  const [next, doors, roomsDoors] = openDoors(
    rooms,
    connectors,
    data,
    width,
    height
  );
  return { data: next, doors, roomsDoors };
}

export default carve;
