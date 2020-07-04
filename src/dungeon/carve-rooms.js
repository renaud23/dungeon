import { TILES, getCoords, randomInt } from "./common";

const MIN_SIZE = 5;
const TRY_LIMITE = 20;

function overlapped(a, b) {
  const [x1, y1, w1, h1] = a;
  const [x2, y2, w2, h2] = b;
  const xx = Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2);
  const yy = Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2);
  if (yy - 1 < h1 + h2 && xx - 1 < w1 + w2) {
    return true;
  }
  return false;
}

function validateRect(rect, rects) {
  return rects.reduce(function (a, r) {
    return a && !overlapped(r, rect);
  }, true);
}

function generateOneRect(width, height) {
  const w = MIN_SIZE + randomInt(MIN_SIZE * 2);
  const h = MIN_SIZE + randomInt(MIN_SIZE * 2);
  const x = 1 + randomInt(width - w - 2);
  const y = 1 + randomInt(height - h - 2);

  return [x, y, w, h];
}

function generateRoom(width, height, rects = [], tryIt = 0) {
  if (tryIt < TRY_LIMITE) {
    const rect = generateOneRect(width, height);
    if (validateRect(rect, rects)) {
      return generateRoom(width, height, [...rects, rect], tryIt);
    }
    return generateRoom(width, height, rects, tryIt + 1);
  }

  return rects;
}

function carve(data, width, height) {
  const rooms = generateRoom(width, height).map(function (rect) {
    const [x, y, w, h] = rect;
    return new Array(w * h).fill(0).map(function (_, i) {
      const [xi, yi] = getCoords(i, w);
      return x + xi + (y + yi) * width;
    });
  });

  const next = [...data];
  rooms.forEach(function (room) {
    room.forEach(function (pos) {
      next[pos] = TILES.GROUND;
    });
  });

  return { data: next, rooms };
}

export default carve;
