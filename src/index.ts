interface FSM<T> {
  states: Set<T>;
  alphabet: Set<string>;
  initialState: T;
  acceptingStates: Set<T>;
  transition: Map<T, Map<string, T>>;
}

/**
 * A createFSM function that create a new FSM 
 *
 * @param {Set<T>}       Q - A finite set of states.
 * @param {Set<string>}  alphabet - A finite input alphabet
 * @param {T}            q0 - The initial state
 * @param {Set<T>}       F - The set of accepting/final states
 * @param {Map<T, Map<string, T>} delta - The transition function
 * 
 */
function createFSM<T>(
  states: Set<T>,
  alphabet: Set<string>,
  initialState: T,
  acceptingStates: Set<T>,
  transition: Map<T, Map<string, T>>
): FSM<T> {
  return {
    states,
    alphabet,
    initialState,
    acceptingStates,
    transition,
  };
}


/**
 * A runFSM function used to run the FSM on various input strings and output the resulting state
 *
 * @param {FSM<string>}  fsm - An instance of FSM<string>
 * @param {string}       input - A finite input alphabet
 * 
 */
function runFSM<T>(fsm: FSM<T>, input: string): T {
  let currentState: T = fsm.initialState;
  for (const symbol of input) {
    const nextState = fsm.transition.get(currentState)?.get(symbol);
    if (!nextState) {
      throw new Error(`Invalid transition from state ${currentState} on symbol ${symbol}`);
    }
    currentState = nextState;
  }
  if (!fsm.acceptingStates.has(currentState)) {
    throw new Error(`Input did not result in an accepting state. Current state: ${currentState}`);
  }
  return currentState;
}

export { runFSM, createFSM, FSM };
