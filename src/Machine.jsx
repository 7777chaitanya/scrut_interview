import React from "react";
import machine from "./machine";
import useMachine from "./useMachine";

const App = () => {
  const [state, send] = useMachine(machine);
  console.log(state);
  return (
    <div>
      <h1>Current state is: {state.value}</h1>
      <button
        onClick={() => {
          send("TRANSITION_TO_TWO");
        }}
      >
        Transition to Two
      </button>
      <button
        onClick={() => {
          send("TRANSITION_TO_ONE");
        }}
      >
        Transition to One
      </button>
      <br />
      <button
        onClick={() => {
          send("INCREMENT");
        }}
      >
        Increment by {state.value}
      </button>
      <h1>Count: {state.context.count}</h1>
    </div>
  );
};

export default App;
