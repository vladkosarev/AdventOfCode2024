const fs = require("fs");

//const data = `2333133121414131402`;
const data = fs.readFileSync("input.txt", "utf8");

const denseMap = data;
const disk = [];
// raw disk
for (let i = 0; i < denseMap.length; i++) {
  for (let j = 0; j < denseMap[i]; j++) {
    if (i % 2 !== 0) disk.push(".");
    else disk.push(i / 2);
  }
}

let space = disk.indexOf(".");
for (let i = 0; i < disk.length; i++) {
  const index = disk.length - 1 - i;
  if (space >= index) break;
  const block = disk[index];
  if (block !== ".") {
    disk[space] = block;
    disk[index] = ".";
  } else continue;

  for (let s = space + 1; s < disk.length; s++) {
    if (disk[s] === ".") {
      space = s;
      break;
    }
  }
}

let checksum = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] === ".") break;
  checksum += i * disk[i];
}

console.log(disk);
console.log(checksum);
