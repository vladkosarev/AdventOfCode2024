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

const data = fs.readFileSync("input.txt", "utf8");
let [orderingInput, pagesInput] = data.split("\n\n");
const ordering = orderingInput.split("\n");
const orderingMap = new Map();

ordering.forEach((pair) => {
  const [key, value] = pair.split("|").map(Number);

  if (!orderingMap.has(key)) {
    orderingMap.set(key, []);
  }
  orderingMap.get(key).push(value);
});

const pages = pagesInput
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => line.split(",").map(Number));

function validate(slice) {
  console.log(slice);
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
function checkPage(page) {
  for (let i = 1; i < page.length; i++) {
    if (!validate(page.slice(0, i + 1))) {
      return 0;
    }
  }
  const middle = Math.floor(page.length / 2);
  console.log(page[middle]);
  return page[middle];
}

let total = 0;
for (let i = 0; i < pages.length; i++) {
  total += checkPage(pages[i]);
}
console.log(total);
