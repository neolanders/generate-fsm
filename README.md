<div align='center'>
  <h1>Generate FSM</h1>
</div>

### Overview

This library provides an ESM module, types for TypeScript, and is covered with tests using jest.

The API module to generate the FSM (Finite State Machine) is based on the abstract definition provided:
 
```
A finite automaton (FA) is a 5-tuple (Q,Σ,q0,F,δ) where,
Q is a finite set of states;
Σ is a finite input alphabet;
q0 ∈ Q is the initial state;
F ⊆ Q is the set of accepting/final states; and
δ:Q×Σ→Q is the transition function.
For any element q of Q and any symbol σ∈Σ, we interpret δ(q,σ) as the state to which the FA
moves, if it is in state q and receives the input σ.
```

### Prerequisties

Make sure to use Node version `18.16.0` or higher to run this project.

It's recommanded to use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) for managing Node version locally and in this project. To install nvm, and use node latest stable version

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm --version
nvm install --lts
nvm use --lts
```

If nvm is already installed just run `nvm use` to set it to mnimum node version requirements in this project.

### Install

```
npm install
```

### Run build

```
npm build
```

### Run tests

Tests using [jest](https://jestjs.io/docs/getting-started)

```
npm test
```

### Package Installation

After publish to install this lirary run

```sh
npm install generate-fsm
```

### Usage

```typescript
  import * as fsm from "generate-fsm";
   
  const Q = new Set(["S0", "S1", "S2"]);
  const alphabet = new Set(["0", "1"]);
  const q0 = "S0";
  const F = new Set(["S0", "S1", "S2"]);
  const delta = new Map([
    ["S0", new Map([["0", "S0"], ["1", "S1"]])],
    ["S1", new Map([["0", "S2"], ["1", "S0"]])],
    ["S2", new Map([["0", "S1"], ["1", "S2"]])]
  ]);
  const modThreeFSM: FSM<string> = fsm.createFSM(Q, alphabet, q0, F, delta);
  const result = fsm.runFSM(modThreeFSM, '101010'); 
  console.log(result); // "S0"
```