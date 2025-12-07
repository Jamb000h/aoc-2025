const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
};

const part1 = (input) => {
  let splits = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "S") {
        input[y + 1][x] = "|";
      }

      if (y > 0 && input[y][x] === "." && input[y - 1][x] === "|") {
        input[y][x] = "|";
      }

      if (input[y][x] === "^" && input[y - 1][x] === "|") {
        let split = false;
        if (x > 0 && input[y][x - 1] === ".") {
          input[y][x - 1] = "|";
          split = true;
        }

        if (x < input[y].length - 1 && input[y][x + 1] === ".") {
          input[y][x + 1] = "|";
          split = true;
        }

        if (split) {
          splits++;
        }
      }
    }
  }

  return splits;
};

const part2 = (input) => {
  const gogogo = (pos) => {
    const [y, x] = pos;

    if (y === input.length || x < 0 || x >= input[y].length) {
      return 1;
    }

    if (
      input[y][x] === "." &&
      (input[y - 1][x] === "S" || input[y - 1][x] === "|")
    ) {
      input[y][x] = "|";
      const duh = gogogo([y + 1, x]);
      input[y][x] = ".";
      return duh;
    }

    if (input[y][x] === "^" && input[y - 1][x] === "|") {
      if (bookkeeping[y + "-" + x]) {
        return bookkeeping[y + "-" + x];
      }
      if (x > 0) {
        input[y][x - 1] = "|";
      }
      if (x < input[y].length - 1) {
        input[y][x + 1] = "|";
      }

      const duh = gogogo([y + 1, x - 1]) + gogogo([y + 1, x + 1]);
      if (x > 0) {
        input[y][x - 1] = ".";
      }
      if (x < input[y].length - 1) {
        input[y][x + 1] = ".";
      }
      bookkeeping[y + "-" + x] = duh;
      return duh;
    }
    return 1;
  };

  const bookkeeping = {};
  const start = [1, input[0].findIndex((x) => x === "S")];

  return gogogo(start);
};

const testInput = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;

console.log(part1(parseInput(testInput)));
console.log(part2(parseInput(testInput)));
