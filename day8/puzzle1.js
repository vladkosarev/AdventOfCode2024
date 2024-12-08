const fs = require("fs");

let d = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

// utility
function prettyPrint2DArray(array) {
  array.forEach((row) => {
    console.log(row.join(""));
  });
}

function countChar(array, char) {
  return array
    .flat()
    .reduce((count, curChar) => (curChar === char ? count + 1 : count), 0);
}

// input and setup
const data = fs.readFileSync("input.txt", "utf8");

const map = data
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((s) => s.split(""));
const antinodeMap = structuredClone(map);

const antennas = new Map();

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const antenna = map[i][j];
    if (antenna === ".") continue;

    if (!antennas.has(antenna)) {
      antennas.set(antenna, []);
    }
    antennas.get(antenna).push([i, j]);
  }
}

// puzzle
function pairs(coords) {
  const pairs = [];
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (i !== j) {
        pairs.push([coords[i], coords[j]]);
      }
    }
  }
  return pairs;
}

function antinodes(pair) {
  const x1 = pair[0][0];
  const y1 = pair[0][1];
  const x2 = pair[1][0];
  const y2 = pair[1][1];
  const dx = x1 - x2;
  const dy = y1 - y2;
  const xa = x1 + dx;
  const ya = y1 + dy;
  if (xa >= 0 && xa < map.length && ya >= 0 && ya < map[0].length) {
    antinodeMap[xa][ya] = "#";
  }
}

for (const [_, locations] of antennas) {
  pairs(locations).forEach((pair) => antinodes(pair));
}

console.log(prettyPrint2DArray(antinodeMap));
console.log(countChar(antinodeMap, "#"));
