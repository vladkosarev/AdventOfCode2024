const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const regex = /don't\(\)|do\(\)|mul\((\d+),(\d+)\)/g;

let result = 0;
let enabled = true;
let match;
while ((match = regex.exec(input)) !== null) {
  switch (match[0]) {
    case "do()":
      enabled = true;
      break;
    case "don't()":
      enabled = false;
      break;
    default:
      if (enabled) result += match[1] * match[2];
  }
}
console.log(result);
