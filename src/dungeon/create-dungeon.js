import carveRooms from "./carve-rooms";
import carveDoors from "./carve-doors";
import carveCorridors from "./carve-corridors";
import refillUnused from "./refill-unused";
import { TILES } from "./common";
import refillCorridors from "./refill-corridors";

function createDungeon(width, height) {
  const { data, rooms } = carveRooms(
    new Array(width * height).fill(TILES.WALL),
    width,
    height
  );
  const { data: withMaze } = carveCorridors(data, width, height);
  const { data: withDoors, doors, rooms: roomsDoors } = carveDoors(
    rooms,
    withMaze,
    width,
    height
  );
  const { data: withRefilled, origin } = refillCorridors(
    rooms,
    withDoors,
    width,
    height
  );
  const dungeon = {
    width,
    height,
    data: withRefilled,
    doors,
    rooms: roomsDoors,
    // refilled, // empty zone refilled with wall
    origin, // start position when refill corridors
  };
  console.log(dungeon);
  return refillUnused(dungeon);
}

export default createDungeon;
