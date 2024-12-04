const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const search = data
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((s) => s.split(""));

function match(i, j) {
  let match = 0;
  if (search[i][j] !== "A") return 0;
  // check boundaries
  if (i === 0 || j === 0 || i === search[0].length - 1 || j === search.length)
    return 0;
  /*
M.S
.A.
M.S
*/
  if (
    search[i - 1][j - 1] === "M" &&
    search[i - 1][j + 1] === "M" &&
    search[i + 1][j - 1] === "S" &&
    search[i + 1][j + 1] === "S"
  )
    return 1;
  /*
S.M
.A.
S.M
*/
  if (
    search[i + 1][j - 1] === "M" &&
    search[i + 1][j + 1] === "M" &&
    search[i - 1][j - 1] === "S" &&
    search[i - 1][j + 1] === "S"
  )
    return 1;
  /*
S.S
.A.
M.M
*/
  if (
    search[i - 1][j + 1] === "M" &&
    search[i + 1][j + 1] === "M" &&
    search[i - 1][j - 1] === "S" &&
    search[i + 1][j - 1] === "S"
  )
    return 1;
  /*
M.M
.A.
S.S
*/
  if (
    search[i - 1][j - 1] === "M" &&
    search[i + 1][j - 1] === "M" &&
    search[i - 1][j + 1] === "S" &&
    search[i + 1][j + 1] === "S"
  )
    return 1;
  return match;
}

let matches = 0;
for (let i = 0; i < search[0].length; i++) {
  for (let j = 0; j < search.length; j++) {
    matches += match(i, j);
  }
}
console.log(matches);
