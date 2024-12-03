const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const regex = /mul\((\d+),(\d+)\)/g;

let result = 0;
for (const match of input.matchAll(regex)) {
  result += match[1] * match[2];
}
console.log(result);
