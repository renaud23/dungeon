export function randomInt(limite) {
  return Math.floor(Math.random() * Math.floor(limite));
}

export function getCoords(position, width) {
  return [position % width, Math.trunc(position / width)];
}

export function isInRect(x, y, rect) {
  const [rx, ry, w, h] = rect;
  if (x >= rx && x < rx + w && y >= ry && y < ry + h) {
    return true;
  }
  return false;
}

export function getMiddle(rect) {
  const [x, y, w, h] = rect;
  return [Math.trunc(x + w / 2), Math.trunc(y + h / 2)];
}

export function isTotallyWalled(x, y, data, width) {
  const count = new Array(9).fill(0).reduce(function (status, _, i) {
    const [xi, yi] = getCoords(i, 3);
    return status + data[x + xi - 1 + (y + yi - 1) * width];
  }, 0);
  return count === 9;
}

export function isInBound(position, width, height, limite = 0) {
  const [x, y] = getCoords(position, width);
  if (
    x > limite &&
    x < width - 1 - limite &&
    y > limite &&
    y < height - 1 - limite
  ) {
    return true;
  }
  return false;
}

export function getNeighbors(position, width) {
  const neighbors = [
    position + 1,
    position - 1,
    position + width,
    position - width,
  ];
  return neighbors;
}

export function randomRoomPos(rooms) {
  const room = rooms[randomInt(rooms.length)];
  return room[randomInt(room.length)];
}

export function arrayToMap(arr) {
  return arr.reduce(function (a, k) {
    return { ...a, [k]: k };
  }, {});
}

export { default as TILES } from "./tiles";
