const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .reduce((prev, cur) => {
      const parts = cur.split(":");
      const from = parts[0].trim();
      const to = parts[1].trim().split(" ");
      return {
        ...prev,
        [from]: to,
      };
    }, {});
};

const part1 = (input) => {
  let routes = 0;
  const queue = ["you"];

  while (queue.length > 0) {
    const serverName = queue.shift();

    if (serverName === "out") {
      routes++;
      continue;
    }

    const nextServers = input[serverName];

    for (const to of nextServers) {
      queue.push(to);
    }
  }

  return routes;
};

const part2 = (input) => {
  const dfs = (next, last, seen) => {
    // Route found
    if (next === last) {
      return 1;
    }

    // We've been here before!
    if (seen[next] !== undefined) {
      return seen[next];
    }

    // DFS forward and count routes
    seen[next] = (input[next] ?? []).reduce(
      (prev, cur) => prev + dfs(cur, last, seen),
      0
    );

    return seen[next];
  };
  const svrToFFT = dfs("svr", "fft", {});
  const svrToDAC = dfs("svr", "dac", {});
  const fftToDAC = dfs("fft", "dac", {});
  const fftToOut = dfs("fft", "out", {});
  const dacToFFT = dfs("dac", "fft", {});
  const dactoOut = dfs("dac", "out", {});

  return svrToFFT * fftToDAC * dactoOut + svrToDAC * dacToFFT * fftToOut;
};

const testInput1 = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`;

const testInput2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`;

console.log(part1(parseInput(testInput1)));
console.log(part2(parseInput(testInput2)));
