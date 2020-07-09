import { isTotallyWalled, getCoords, isInBound, TILES } from "./common";

function carve(data, width, height) {
  const next = data.map(function (a, i) {
    const [x, y] = getCoords(i, width);
    if (isInBound(i, width, height) && isTotallyWalled(x, y, data, width)) {
      return TILES.GROUND;
    }
    return a;
  });

  return { data: next };
}

export default carve;
