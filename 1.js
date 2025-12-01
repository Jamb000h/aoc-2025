const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const direction = line[0];
      const distance = parseInt(line.slice(1), 10);
      return { direction, distance };
    });
};

const part1 = (input) => {
  const directions = parseInput(input);
  let pos = 50;
  let zeroed = 0;
  for (const move of directions) {
    if (move.direction === "L") {
      pos -= move.distance % 100;
      if (pos < 0) {
        pos += 100;
      }
    } else {
      pos += move.distance % 100;
      pos = pos % 100;
    }
    if (pos === 0) {
      zeroed += 1;
    }
  }
  return zeroed;
};

const part2 = (input) => {
  const directions = parseInput(input);
  let pos = 50;
  let zeroed = 0;
  for (const move of directions) {
    let previousPos = pos;
    // Calculate full loops of 100
    const loops = Math.floor(move.distance / 100);
    zeroed += loops;

    if (move.direction === "L") {
      pos -= move.distance % 100;
      if (pos < 0) {
        if (previousPos !== 0) {
          // Crossed zero when going left
          zeroed += 1;
        }
        // Adjust position
        pos += 100;
      }
    } else {
      pos += move.distance % 100;
      if (pos > 100) {
        if (previousPos !== 0) {
          // Crossed zero when going right
          zeroed += 1;
        }
      }
      pos = pos % 100;
    }
    // Landed exactly on zero
    if (pos === 0) {
      zeroed += 1;
    }
  }
  return zeroed;
};

const testInput = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

console.log(part1(testInput));
console.log(part2(testInput));
