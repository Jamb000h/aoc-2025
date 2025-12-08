const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(",").map(Number));
};

const part1 = (input) => {
  const euclideanDistance = (box1, box2) => {
    return Math.sqrt(
      Math.pow(box1.x - box2.x, 2) +
        Math.pow(box1.y - box2.y, 2) +
        Math.pow(box1.z - box2.z, 2)
    );
  };
  let boxes = input.map((box) => {
    const [x, y, z] = box;
    return { x, y, z };
  });

  const distances = [];
  for (const box1 of boxes) {
    for (const box2 of boxes) {
      if (box1 === box2) {
        continue;
      }
      distances.push({ box1, box2, distance: euclideanDistance(box1, box2) });
    }
  }
  distances.sort((d1, d2) => d1.distance - d2.distance);

  // Too lazy to remove duplicate distances so just keeping track of them
  const seenDistances = [];
  const circuits = [];
  let connections = 0;
  let i = 0;
  while (connections < 10) {
    const distance = distances[i];
    if (
      seenDistances.some(
        (d1) => d1 !== distance && d1.distance === distance.distance
      )
    ) {
      i++;
      continue;
    }

    seenDistances.push(distance);

    const { box1, box2 } = distance;

    const box1Circuit = circuits.find((circuit) =>
      circuit.some((box) => box === box1)
    );
    const box2Circuit = circuits.find((circuit) =>
      circuit.some((box) => box === box2)
    );

    const newCircuit = [];
    if (box1Circuit) {
      newCircuit.push(...box1Circuit);
      box1Circuit.length = 0;
    } else {
      newCircuit.push(box1);
    }
    if (box2Circuit) {
      newCircuit.push(...box2Circuit);
      box2Circuit.length = 0;
    } else {
      newCircuit.push(box2);
    }
    circuits.push(newCircuit);
    i++;
    connections++;
  }

  circuits.sort((circuit1, circuit2) => circuit2.length - circuit1.length);
  return circuits[0].length * circuits[1].length * circuits[2].length;
};

const part2 = (input) => {
  const euclideanDistance = (box1, box2) => {
    return Math.sqrt(
      Math.pow(box1.x - box2.x, 2) +
        Math.pow(box1.y - box2.y, 2) +
        Math.pow(box1.z - box2.z, 2)
    );
  };
  let boxes = input.map((box) => {
    const [x, y, z] = box;
    return { x, y, z };
  });

  const distances = [];
  for (const box1 of boxes) {
    for (const box2 of boxes) {
      if (box1 === box2) {
        continue;
      }
      distances.push({ box1, box2, distance: euclideanDistance(box1, box2) });
    }
  }
  distances.sort((d1, d2) => d1.distance - d2.distance);

  // Too lazy to remove duplicate distances so just keeping track of them
  const seenDistances = [];
  const circuits = [];
  let i = 0;
  while (true) {
    const distance = distances[i];
    if (
      seenDistances.some(
        (d1) => d1 !== distance && d1.distance === distance.distance
      )
    ) {
      i++;
      continue;
    }

    seenDistances.push(distance);

    const { box1, box2 } = distance;

    const box1Circuit = circuits.find((circuit) =>
      circuit.some((box) => box === box1)
    );
    const box2Circuit = circuits.find((circuit) =>
      circuit.some((box) => box === box2)
    );

    const newCircuit = [];
    if (box1Circuit) {
      newCircuit.push(...box1Circuit);
      box1Circuit.length = 0;
    } else {
      newCircuit.push(box1);
    }
    if (box2Circuit) {
      newCircuit.push(...box2Circuit);
      box2Circuit.length = 0;
    } else {
      newCircuit.push(box2);
    }
    circuits.push(newCircuit);
    if (newCircuit.length === boxes.length || i === distances.length - 1) {
      return box1.x * box2.x;
    }
    i++;
  }
};

const testInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`;

const input = parseInput(testInput);
console.log(part1(input));
console.log(part2(input));
