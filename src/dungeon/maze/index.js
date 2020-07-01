import carveMaze from "./carve-maze";
import { TILES } from "../common";

function createMaze(width, height) {
  const size = width * height;
  const { maze } = carveMaze(
    width + 1,
    new Array(size).fill(TILES.WALL),
    width,
    height
  );
  return { data: maze, width, height };
}

export { default as carveMaze } from "./carve-maze";

export default createMaze;
