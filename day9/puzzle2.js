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

function findSpace(disk, length) {
  let count = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") {
      count++;
      if (count === length) {
        return i - length + 1;
      }
    } else {
      count = 0;
    }
  }

  return -1;
}

function getFile(disk, position) {
  const block = disk[position];
  length = 0;
  for (let i = position; i >= 0; i--) {
    if (disk[i] === block) length++;
    else return length;
  }
  return 1;
}

function moveFile(disk, space, position, length) {
  const block = disk[position];
  for (let i = 0; i < length; i++) {
    disk[space + i] = block;
    disk[position - i] = ".";
  }
}

console.log(disk.join(""));

for (let i = disk.length - 1; i > 0; i--) {
  if (disk[i] === ".") continue;
  const length = getFile(disk, i);
  const space = findSpace(disk, length);
  if (space > -1 && space < i - length) moveFile(disk, space, i, length);
  i = i - length + 1;
}

let checksum = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] === ".") continue;
  checksum += i * disk[i];
}

console.log(disk.join(""));
console.log(checksum);
