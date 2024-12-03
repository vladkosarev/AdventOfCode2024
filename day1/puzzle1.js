const fs = require("fs");

function loadAndParseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter((line) => line.trim().length > 0);
  const loc1 = [];
  const loc2 = [];
  lines.forEach((line) => {
    const [f, s] = line.split("   ");
    loc1.push(f);
    loc2.push(s);
  });
  return [loc1, loc2];
}

function calculateTotalDistance(list1, list2) {
  const sorted1 = [...list1].sort((a, b) => a - b);
  const sorted2 = [...list2].sort((a, b) => a - b);
  let distance = 0;
  for (let i = 0; i < sorted1.length; i++) {
    distance += Math.abs(sorted1[i] - sorted2[i]);
  }
  return distance;
}

[loc1, loc2] = loadAndParseFile("input.txt");
distance = calculateTotalDistance(loc1, loc2);
console.log(distance);

module.exports = calculateTotalDistance;
