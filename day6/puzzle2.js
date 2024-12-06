const fs = require("fs");
const readline = require("readline");

let data = `....#.....
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
data = fs.readFileSync("input.txt", "utf8");
const MAP = data.split("\n").map((d) => d.split(""));
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
function move(map, x, y, direction, O) {
  const movement = { "^": [0, -1], ">": [1, 0], v: [0, 1], "<": [-1, 0] };
  const directions = Object.keys(movement);
  let count = 0;
  while (true) {
    // we can remove all of the loop logic and just leave these lines in :)
    // I am leaving it here because it was the most interesting realization from the puzzle
    count++;
    if (count > 10000) {
      return 1;
    }

    // leaving the map
    if (
      x + movement[direction][0] < 0 ||
      y + movement[direction][1] < 0 ||
      x + movement[direction][0] >= map[0].length ||
      y + movement[direction][1] >= map.length
    ) {
      map[y][x] = "X";
      if (animate) drawMap(map);
      return 0;
    }
    const nextCell =
      map[y + movement[direction][1]][x + movement[direction][0]];
    if (nextCell === "#" || nextCell === "O") {
      if (nextCell === "O") {
        if (O[direction]) {
          return 1;
        } else {
          O[direction] = true;
        }
      }
      direction =
        directions[(directions.indexOf(direction) + 1) % directions.length];
    } else {
      map[y][x] = "X";
      if (animate) drawMap(map);
      x += movement[direction][0];
      y += movement[direction][1];
    }
  }
}

let [x, y] = findStartingPosition(MAP);

let total = 0;
for (let i = 0; i < MAP[0].length; i++) {
  for (let j = 0; j < MAP[0].length; j++) {
    let map = MAP.map((row) => [...row]);
    if (MAP[j][i] === "#" || MAP[j][i] === "^") continue;
    map[j][i] = "O";
    total += move(map, x, y, "^", {});
  }
}
console.log(total);
