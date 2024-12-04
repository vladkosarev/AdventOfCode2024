const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const search = data
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((s) => s.split(""));
const word = "XMAS";

/*

S..S..S
.A.A.A.
..MMM..
SAMXMAS
..MMM..
.A.A.A.
S..S..S

*/

function getMatch(i, j, direction_i, direction_j) {
  // check boundaries
  if (i + direction_i * 3 < 0 || i + direction_i * 3 >= search[0].length)
    return 0;
  if (j + direction_j * 3 < 0 || j + direction_j * 3 >= search.length) return 0;

  for (let letter = 1; letter < word.length; letter++) {
    if (
      search[i + letter * direction_i][j + letter * direction_j] !==
      word[letter]
    )
      return 0;
  }

  return 1;
}

function getMatches(i, j) {
  let total = 0;
  if (search[i][j] !== word[0]) return 0;
  total += getMatch(i, j, -1, -1);
  total += getMatch(i, j, -1, 0);
  total += getMatch(i, j, 0, -1);
  total += getMatch(i, j, 1, 1);
  total += getMatch(i, j, 0, 1);
  total += getMatch(i, j, 1, 0);
  total += getMatch(i, j, -1, 1);
  total += getMatch(i, j, 1, -1);

  return total;
}

let matches = 0;
for (let i = 0; i < search[0].length; i++) {
  for (let j = 0; j < search.length; j++) {
    matches += getMatches(i, j);
  }
}
console.log(matches);
