const parseInput = (input) => {
  const freshRanges = input
    .trim()
    .split("\n\n")[0]
    .split("\n")
    .map((range) => range.split("-").map(Number));
  const available = input.trim().split("\n\n")[1].split("\n").map(Number);
  return { freshRanges, available };
};

const part1 = (input) => {
  return input.available.reduce((prev, cur) => {
    const isFresh = input.freshRanges.some(
      ([start, end]) => cur >= start && cur <= end
    );
    return prev + (isFresh ? 1 : 0);
  }, 0);
};

const part2 = ({ freshRanges }) => {
  freshRanges.sort((a, b) => a[0] - b[0]);
  let freshes = 0;
  let currentEnd = null;
  for (const [start, end] of freshRanges) {
    if (!currentEnd) {
      freshes = end - start + 1;
    } else {
      if (start > currentEnd) {
        freshes += end - start + 1;
      } else {
        freshes += Math.max(0, end - currentEnd);
      }
    }
    currentEnd = Math.max(currentEnd, end);
  }
  return freshes;
};

const testInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
