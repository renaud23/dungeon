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

    new Array(1 + randomInt(2)).fill(0).forEach(function (c) {
      const witch = conns[randomInt(conns.length)];
      next[witch] = TILES.GROUND;
    });

    const leftConns = connectors.reduce(function (a, c) {
      if (conns.indexOf(c) !== -1) {
        return a;
      }
      return [...a, c];
    }, []);
    return [next, leftConns];
  }

  return [data, connectors];
}

function openDoors(rooms, connectors, data, width, height) {
  const [room, ...leftRooms] = rooms;
  const [next, leftConns] = openRoom(room, connectors, data, width);
  if (!leftRooms.length) {
    return [next];
  }
  return openDoors(leftRooms, leftConns, next, width, height);
}

function carve(rooms, data, width, height) {
  const filled = filledRooms(rooms, data, width);
  const connectors = findConnectors(filled, width, height);
  const [next] = openDoors(rooms, connectors, data, width, height);
  return { data: next, doors: [] };
}

export default carve;
