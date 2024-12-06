const fs = require("fs");

const d = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

// parse input
const data = fs.readFileSync("input.txt", "utf8");
let [orderingInput, updatesInput] = data.split("\n\n");
const ordering = orderingInput.split("\n");
const orderingMap = new Map();

ordering.forEach((pair) => {
  const [key, value] = pair.split("|").map(Number);

  if (!orderingMap.has(key)) {
    orderingMap.set(key, []);
  }
  orderingMap.get(key).push(value);
});

const updates = updatesInput
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => line.split(",").map(Number));

// solve puzzle
function validate(slice) {
  const page = slice[slice.length - 1];
  rules = orderingMap.get(page);
  if (!rules) return true;
  for (let i = 0; i < slice.length - 1; i++) {
    if (rules.includes(slice[i])) {
      return false;
    }
  }
  return true;
}

function checkUpdate(update) {
  for (let i = 1; i < update.length; i++) {
    if (!validate(update.slice(0, i + 1))) {
      let fixedUpdate = update;
      fixedUpdate.sort((a, b) => {
        const rules = orderingMap.get(a);
        if (!rules) return 0;
        if (rules.includes(b)) return -1;
      });
      const middle = Math.floor(fixedUpdate.length / 2);
      return fixedUpdate[middle];
    }
  }
  return 0;
}

let total = 0;
for (let i = 0; i < updates.length; i++) {
  total += checkUpdate(updates[i]);
}
console.log(total);
