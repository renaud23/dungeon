import { getCoords, randomInt, isTotallyWalled } from "./common";
import { carveMaze } from "./maze";

function findDisponibles(data, width, height) {
  return data.reduce(function (a, _, i) {
    const [x, y] = getCoords(i, width);
    if (x > 0 && y > 0 && x < width - 1 && y < height - 1) {
      return isTotallyWalled(x, y, data, width) ? [...a, i] : a;
    }
    return a;
  }, []);
}

function carve(data, width, height, list = []) {
  const disponibles = findDisponibles(data, width, height);
  if (disponibles.length) {
    const witch = disponibles[randomInt(disponibles.length)];
    const { maze, corridors } = carveMaze(witch, data, width, height);
    const { data: withCorridors, corridorsList } = carve(maze, width, height, [
      ...list,
      corridors,
    ]);
    return { data: withCorridors, corridorsList };
  }
  return { data, corridorsList: list };
}

export default carve;
