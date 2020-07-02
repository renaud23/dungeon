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

function chooseRandomConnectors(room, connectors, width) {
  const conns = room.reduce(
    function (a, pos) {
      return [...a, ...getConnectorsNear(pos, connectors, width)];
    },

    []
  );

  return new Array(1 + randomInt(1)).fill(0).map(function () {
    return conns[randomInt(conns.length)];
  });
}

function carve(rooms, data, width, height) {
  const filled = filledRooms(rooms, data, width);
  const connectors = findConnectors(filled, width, height);

  const connectorsToOpen = rooms.reduce(function (a, room) {
    const conns = chooseRandomConnectors(room, connectors, width);

    return [...a, ...conns];
  }, []);
  const next = data.map(function (v, i) {
    if (connectorsToOpen.indexOf(i) !== -1) {
      return TILES.GROUND;
    }
    return v;
  });

  return { data: next, connectors: connectorsToOpen };
}

export default carve;
