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
  const occurrences = new Map();
  for (let i = 0; i < list2.length; i++) {
    occurrences.set(list2[i], (occurrences.get(list2[i]) || 0) + 1);
  }
  let distance = 0;
  for (let i = 0; i < list1.length; i++) {
    distance += list1[i] * (occurrences.get(list1[i]) || 0);
  }
  return distance;
}

[loc1, loc2] = loadAndParseFile("input.txt");
distance = calculateTotalDistance(loc1, loc2);
console.log(distance);
