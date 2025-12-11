const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .reduce((prev, cur) => {
      const parts = cur.split(" ");
      return [
        ...prev,
        {
          lightsTarget: parts[0].slice(1, -1),
          lights: parts[0]
            .slice(1, -1)
            .split("")
            .map(() => "."),
          buttons: parts
            .slice(1, -1)
            .map((button) => button.slice(1, -1).split(",").map(Number)),

          joltages: parts.at(-1).slice(1, -1).split(",").map(Number),
        },
      ];
    }, []);
};

const part1 = (input) => {
  const machinePresses = [];
  for (const machine of input) {
    let queue = []; // Let's do BFS
    const seenLights = [];
    let leastAmountOfButtonPresses = null;

    // Fill queue with initial values
    for (let i = 0; i < machine.buttons.length; i++) {
      queue.push({
        buttonIndex: i,
        lights: [...machine.lights],
        buttonPresses: 1,
      });
    }

    while (queue.length > 0 && leastAmountOfButtonPresses === null) {
      const { buttonIndex, lights, buttonPresses } = queue.shift();

      const newLights = [...lights];

      // Press the button
      for (const lightIndex of machine.buttons[buttonIndex]) {
        newLights[lightIndex] = newLights[lightIndex] === "." ? "#" : ".";
      }

      // Machine turned on!
      if (newLights.join("") === machine.lightsTarget) {
        leastAmountOfButtonPresses = buttonPresses;
        break;
      }

      // These lights have already been seen
      if (seenLights.some((l) => l.join("") === newLights.join(""))) {
        continue;
      }

      // Store these lights to not try these again
      seenLights.push(newLights);

      for (let i = 0; i < machine.buttons.length; i++) {
        if (i === buttonIndex) {
          continue;
        }
        queue.push({
          buttonIndex: i,
          lights: [...newLights],
          buttonPresses: buttonPresses + 1,
        });
      }
    }

    machinePresses.push(leastAmountOfButtonPresses);
  }

  return machinePresses.reduce((prev, cur) => prev + cur, 0);
};

const part2 = (input) => {};

const testInput = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
