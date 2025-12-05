const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
};

const part1 = (input) => {
  let accessibleRolls = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== "@") {
        continue;
      }
      let adjacentRolls = 0;
      for (let nY = y - 1; nY <= y + 1; nY++) {
        if (nY < 0 || nY >= input.length) {
          continue;
        }
        for (let nX = x - 1; nX <= x + 1; nX++) {
          if (nX < 0 || nX >= input[y].length) {
            continue;
          }
          if (input[nY][nX] === "@") {
            adjacentRolls++;
          }
        }
      }
      if (adjacentRolls <= 4) {
        accessibleRolls++;
      }
    }
  }

  return accessibleRolls;
};

const part2 = (input) => {
  let accessibleRolls = 0;
  while (true) {
    let previouslyAccessibleRolls = accessibleRolls;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] !== "@") {
          continue;
        }
        let adjacentRolls = 0;
        for (let nY = y - 1; nY <= y + 1; nY++) {
          if (nY < 0 || nY >= input.length) {
            continue;
          }
          for (let nX = x - 1; nX <= x + 1; nX++) {
            if (nX < 0 || nX >= input[y].length) {
              continue;
            }
            if (input[nY][nX] === "@" || input[nY][nX] === "x") {
              adjacentRolls++;
            }
          }
        }
        if (adjacentRolls <= 4) {
          accessibleRolls++;
          input[y][x] = "x";
        }
      }
    }

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === "x") {
          input[y][x] = ".";
        }
      }
    }

    if (previouslyAccessibleRolls === accessibleRolls) {
      break;
    }
  }
  return accessibleRolls;
};

const testInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
