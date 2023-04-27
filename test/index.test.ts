import { FSM, createFSM, runFSM } from "../src/index";

test("generate a new FSM and implement mod-three procedure", () => {
  const Q = new Set(["S0", "S1", "S2"]);
  const alphabet = new Set(["0", "1"]);
  const q0 = "S0";
  const F = new Set(["S0", "S1", "S2"]);
  const delta = new Map([
    ["S0", new Map([["0", "S0"], ["1", "S1"]])],
    ["S1", new Map([["0", "S2"], ["1", "S0"]])],
    ["S2", new Map([["0", "S1"], ["1", "S2"]])]
  ]);
  const modThreeFSM: FSM<string> = createFSM(Q, alphabet, q0, F, delta);

  expect(runFSM(modThreeFSM, '101010')).toBe('S0'); 
  expect(runFSM(modThreeFSM, '010101')).toBe('S0');
  expect(runFSM(modThreeFSM, '110')).toBe('S0');
  expect(runFSM(modThreeFSM, '111')).toBe('S1');
  expect(runFSM(modThreeFSM, '1010')).toBe('S1');
  expect(runFSM(modThreeFSM, '10')).toBe('S2');
});
