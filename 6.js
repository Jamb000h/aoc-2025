const parseInput = (input) => {
  return input;
};

const part1 = (input) => {
  const math = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(/\s+/));
  const problems = [];
  for (let y = 0; y < math.length; y++) {
    for (let x = 0; x < math[y].length; x++) {
      if (y === 0) {
        problems.push([]);
      }
      problems[x].push(math[y][x]);
    }
  }
  return problems.reduce((prev, cur) => {
    const numbers = cur.slice(0, -1).map(Number);
    const operation = cur.at(-1);
    if (operation === "+") {
      return prev + numbers.reduce((sum, item) => sum + item, 0);
    } else {
      return prev + numbers.reduce((sum, item) => sum * item, 1);
    }
  }, 0);
};

const part2 = (input) => {
  const problemStarts = [0];
  const rows = input.trim().split("\n");
  for (let x = 0; x < rows[0].length; x++) {
    if (rows.every((row) => row[x] === " ")) {
      problemStarts.push(x + 1);
    }
  }
  const operators = [];
  for (const x of problemStarts) {
    operators.push(rows.at(-1).split("")[x]);
  }
  const mathRows = rows.slice(0, rows.length - 1);
  const problems = [];
  for (let i = 0; i < problemStarts.length; i++) {
    const problemEnd =
      i < problemStarts.length - 1
        ? problemStarts[i + 1] - 1
        : mathRows[0].length;
    const problem = [];
    for (let x = problemStarts[i]; x < problemEnd; x++) {
      problem.push(mathRows.reduce((prev, cur) => prev + cur[x], ""));
    }
    problem.push(operators[i]);
    problems.push(problem);
  }
  return problems.reduce((prev, cur) => {
    const numbers = cur.slice(0, -1).map(Number);
    const operation = cur.at(-1);
    if (operation === "+") {
      return prev + numbers.reduce((sum, item) => sum + item, 0);
    } else {
      return prev + numbers.reduce((sum, item) => sum * item, 1);
    }
  }, 0);
};

const testInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
