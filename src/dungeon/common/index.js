export function randomInt(limite) {
  return Math.floor(Math.random() * Math.floor(limite));
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

export { default as TILES } from "./tiles";
