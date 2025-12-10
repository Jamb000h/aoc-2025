const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(",").map(Number));
};

const part1 = (input) => {
  let largestArea = 0;
  for (const tile1 of input) {
    for (const tile2 of input) {
      if (tile1 === tile2) {
        continue;
      }

      const area =
        (Math.abs(tile1[0] - tile2[0]) + 1) *
        (Math.abs(tile1[1] - tile2[1]) + 1);
      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
};

const part2 = (input) => {
  let largestArea = 0;
  for (const tile1 of input) {
    for (const tile2 of input) {
      if (tile1 === tile2) {
        continue;
      }

      const area =
        (Math.abs(tile1[0] - tile2[0]) + 1) *
        (Math.abs(tile1[1] - tile2[1]) + 1);

      if (area > largestArea) {
        const minY = Math.min(tile1[1], tile2[1]);
        const maxY = Math.max(tile1[1], tile2[1]);
        const minX = Math.min(tile1[0], tile2[0]);
        const maxX = Math.max(tile1[0], tile2[0]);
        let notARectangle = false;
        // Check if the perimeter dips within the area
        for (let i = 0; i < input.length; i++) {
          if (notARectangle) {
            break;
          }
          const [currentX, currentY] = input[i];
          const [nextX, nextY] =
            i + 1 === input.length ? input[0] : input[i + 1];

          // Draw the loop
          if (currentY === nextY) {
            for (
              let x = Math.min(currentX, nextX);
              x <= Math.max(currentX, nextX);
              x++
            ) {
              if (currentY > minY && currentY < maxY && x > minX && x < maxX) {
                notARectangle = true;
                break;
              }
            }
          } else if (currentX === nextX) {
            for (
              let y = Math.min(currentY, nextY);
              y <= Math.max(currentY, nextY);
              y++
            ) {
              if (y > minY && y < maxY && currentX > minX && currentX < maxX) {
                notARectangle = true;
                break;
              }
            }
          }
        }
        if (notARectangle) {
          continue;
        }
        largestArea = area;
      }
    }
  }

  return largestArea;
};

const printGrid = (grid) => {
  for (const row of grid) {
    console.log(row.join(" "));
    console.log(" ");
  }
};

const testInput = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
