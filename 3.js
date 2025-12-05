const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split("").map(Number));
};

const part1 = (input) => {
  return calculateJoltagesForBanks(input, 2);
};

const part2 = (input) => {
  return calculateJoltagesForBanks(input, 12);
};

const calculateJoltagesForBanks = (banks, batteriesToTurnOn) => {
  const joltages = [];
  for (const bank of banks) {
    const batteries = [];
    while (batteries.length < batteriesToTurnOn) {
      const windowStart = batteries.length ? batteries.at(-1) + 1 : 0;
      const searchWindow = bank.slice(
        windowStart,
        bank.length - batteriesToTurnOn + batteries.length + 1
      );
      const maxValue = Math.max(...searchWindow);
      batteries.push(searchWindow.indexOf(maxValue) + windowStart);
    }
    const joltage = batteries.reduce(
      (prev, cur) => prev + bank[cur].toString(),
      ""
    );
    joltages.push(Number(joltage));
  }

  return joltages.reduce((prev, cur) => prev + cur, 0);
};

const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
