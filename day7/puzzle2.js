const fs = require("fs");

const d = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const data = fs.readFileSync("input.txt", "utf8");

/*
11 6 16 29
3

 ***
 **+
 *++
 +++
 +**
 ++*
 *+*
 +*+

2^3

 **
 *+
 +*
 ++

*/
let equations = data.split("\n").filter((s) => s.trim().length > 0);

function permutations(chars, length) {
  if (length === 1) return chars.map((c) => [c]);

  let results = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const remaining = permutations(chars, length - 1);

    for (let perm of remaining) {
      results.push([char, ...perm]);
    }
  }

  return results;
}

function valid(equation) {
  const input = equation.split(": ");
  const target = Number(input[0]);
  const numbers = input[1].split(" ").map(Number);
  const perm = permutations(["+", "*", "||"], numbers.length - 1);
  for (let i = 0; i < perm.length; i++) {
    let total = numbers[0];
    for (let j = 0; j < perm[i].length; j++) {
      switch (perm[i][j]) {
        case "+":
          total += numbers[j + 1];
          break;
        case "*":
          total *= numbers[j + 1];
          break;
        case "||":
          total = Number(String(total) + String(numbers[j + 1]));
          break;
      }
    }
    if (total === target) return target;
  }
  return 0;
}

const result = equations.reduce((acc, val) => acc + valid(val), 0);
console.log(result);
