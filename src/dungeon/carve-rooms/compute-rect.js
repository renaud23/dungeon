// import { isInRect } from "../common";

const THETA = 0.4;

function carveRects(rect, limite = 4) {
  if (limite > 0) {
    const [x, y, w, h] = rect;
    if (limite % 2 === 0) {
      const wi = Math.trunc(w / 4 + (w / 2) * Math.random());
      return [
        ...carveRects([x, y, wi, h], limite - 1),
        ...carveRects([x + wi, y, w - wi, h], limite - 1),
      ];
    }

    const hi = Math.trunc(h / 4 + (h / 2) * Math.random());
    return [
      ...carveRects([x, y, w, hi], limite - 1),
      ...carveRects([x, y + hi, w, h - hi], limite - 1),
    ];
  }
  return [rect];
}

export default carveRects;
