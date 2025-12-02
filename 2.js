const parseInput = (input) => {
  const ranges = input.split(",").map((range) => range.split("-").map(Number));
  return ranges;
};

const part1 = (input) => {
  const ranges = parseInput(input);
  let invalids = [];
  for (const range of ranges) {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
      const s = i.toString();
      if (s.slice(0, s.length / 2) === s.slice(s.length / 2)) {
        invalids.push(i);
      }
    }
  }

  return invalids.reduce((prev, cur) => prev + cur, 0);
};

const part2 = (input) => {
  const ranges = parseInput(input);
  let invalids = [];
  for (const range of ranges) {
    const [start, end] = range;

    for (let i = start; i <= end; i++) {
      const s = i.toString();

      // Split string into parts and compare all parts
      // start from largest possible size, which is half of the string
      for (let j = Math.floor(s.length / 2); j > 0; j--) {
        if (s.length % j !== 0) {
          // Cannot divide string by j -> can't be a sequence length
          continue;
        }

        // There should be k parts of length j
        const numParts = s.length / j;
        const parts = [];

        for (let k = 0; k < numParts; k++) {
          parts.push(s.slice(k * j, (k + 1) * j));
        }

        if (parts.every((part) => part === parts[0])) {
          invalids.push(i);
          break;
        }
      }
    }
  }
  return invalids.reduce((prev, cur) => prev + cur, 0);
};

const testInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
`;

console.log(part1(testInput));
console.log(part2(testInput));
