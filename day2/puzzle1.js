const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function processReport(report) {
  let pass = 1;
  const increasing = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    if (
      (increasing &&
        (report[i] >= report[i + 1] || report[i + 1] - report[i] > 3)) ||
      (!increasing &&
        (report[i] <= report[i + 1] || report[i] - report[i + 1] > 3))
    ) {
      pass = 0;
      break;
    }
  }
  return pass;
}

const reports = input.split("\n").filter((line) => line.trim().length > 0);
passed = 0;
for (let i = 0; i < reports.length; i++) {
  passed += processReport(reports[i].split(" ").map(Number));
}
console.log(passed);
