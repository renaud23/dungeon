import carveRooms, { carveRooms as recarveRooms } from "./carve-rooms";
import { carveMaze } from "./maze";
import { TILES, getCoords, randomInt, isTotallyWalled } from "./common";
import enlargedRooms from "./enlarge-room";

function findDisponibles(data, width, height) {
  return data.reduce(function (a, _, i) {
    const [x, y] = getCoords(i, width);
    if (x > 0 && y > 0 && x < width - 1 && y < height - 1) {
      return isTotallyWalled(x, y, data, width) ? [...a, i] : a;
    }
    return a;
  }, []);
}

function carveCorridors(data, width, height, corridorsList = []) {
  const disponibles = findDisponibles(data, width, height);
  if (disponibles.length) {
    const witch = disponibles[randomInt(disponibles.length)];
    const { maze, corridors } = carveMaze(witch, data, width, height);
    const { data: withCorridors, list } = carveCorridors(maze, width, height, [
      ...corridorsList,
      corridors,
    ]);
    return { data: withCorridors, list };
  }
  return { data, list: corridorsList };
}

function createDungeon(width, height) {
  const { data, rooms } = carveRooms(
    new Array(width * height).fill(TILES.WALL),
    width,
    height
  );

  const { data: withMaze, list } = carveCorridors(data, width, height);
  const { data: enlarged } = enlargedRooms(rooms, withMaze, width, height);

  return { width, height, data: enlarged };
}

export default (...args) => {
  const start = new Date().getTime();
  const what = createDungeon(...args);
  console.log("ending ", new Date().getTime() - start);
  return what;
};
