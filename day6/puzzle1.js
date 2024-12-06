const fs = require("fs");
const readline = require("readline");

const d = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const animate = false;

// input
const data = fs.readFileSync("input.txt", "utf8");
let map = data.split("\n").map((d) => d.split(""));
function findStartingPosition(map) {
  let [x, y] = [0, 0];
  for (y = 0; y < map.length; y++) {
    x = map[y].indexOf("^");
    if (x > -1) break;
  }
  return [x, y];
}

// animation
let startingLine = 0;
process.stdout.write("\n");
startingLine = process.stdout.rows - (process.stdout.rows - 1);

function drawMap(map) {
  map.forEach((line, index) => {
    readline.cursorTo(process.stdout, 0, startingLine + index);
    readline.clearLine(process.stdout, 0);
    process.stdout.write(line.join(""));
  });
}

// puzzle
function move(map, x, y, direction) {
  const movement = { "^": [0, -1], ">": [1, 0], v: [0, 1], "<": [-1, 0] };
  // leaving the map
  if (
    x + movement[direction][0] < 0 ||
    y + movement[direction][1] < 0 ||
    x + movement[direction][0] >= map[0].length ||
    y + movement[direction][1] >= map.length
  ) {
    map[y][x] = "X";
    if (animate) drawMap(map);
    return map;
  }
  const nextCell = map[y + movement[direction][1]][x + movement[direction][0]];
  if (nextCell === "#") {
    const directions = Object.keys(movement);
    return move(
      map,
      x,
      y,
      directions[(directions.indexOf(direction) + 1) % directions.length]
    );
  } else {
    map[y][x] = "X";
    if (animate) drawMap(map);
    return move(
      map,
      x + movement[direction][0],
      y + movement[direction][1],
      direction
    );
  }
}

let [x, y] = findStartingPosition(map);

move(map, x, y, "^");
const total = map.flat().filter((visited) => visited === "X").length;
console.log(total);
