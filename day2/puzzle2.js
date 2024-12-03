const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function processReport(report) {
  let pass = 1;
  permutations = createPermutations(report);
  for (let p = 0; p < permutations.length; p++) {
    pass = 1;
    const report = permutations[p];
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
    if (pass === 1) break;
  }
  return pass;
}

function createPermutations(report) {
  const length = report.length;
  const permutations = [report];
  for (let i = 0; i < length; i++) {
    const newReport = [];
    for (let j = 0; j < length; j++) {
      if (j !== i) {
        newReport.push(report[j]);
      }
    }
    permutations.push(newReport);
  }
  return permutations;
}

const reports = input.split("\n").filter((line) => line.trim().length > 0);
passed = 0;
for (let i = 0; i < reports.length; i++) {
  passed += processReport(reports[i].split(" ").map(Number));
}
console.log(passed);
