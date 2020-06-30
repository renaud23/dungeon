import { isInRect } from "../common";

// export function printRoom(rect, room) {
//   const [x, y, w, h] = rect;
//   console.log([x, y, w, h]);
//   const [rows] = new Array(w * h).fill(1).reduce(
//     function ([r, c], _, i) {
//       const t = room[i];
//       if (i % w === w - 1) {
//         return [[...r, `${c}${t} ${i}`], ""];
//       }
//       return [r, `${c}${t}`];
//     },
//     [[], ""]
//   );
//   rows.forEach(function (row) {
//     console.log(row);
//   });
// }

function carveRect(rect) {
  const [x, y, w, h] = rect;
  const width = Math.trunc(0.4 * w * (1 + Math.random()));
  const height = Math.trunc(0.4 * h * (1 + Math.random()));
  const xi = Math.trunc((w - width) / 2);
  const yi = Math.trunc((h - height) / 2);
  const zone = [xi, yi, width, height];

  const room = new Array(w * h).fill(1).map(function (_, i) {
    const px = i % w;
    const py = Math.trunc(i / w);

    if (isInRect(px, py, zone)) {
      return 0;
    }

    return 1;
  });
  return [rect, [room, [[x + xi, y + yi, width, height]]]];
}

export default carveRect;
