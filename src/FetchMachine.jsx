import React from "react";
import machine from "./fetchMachine";
import useMachine from "./useMachine";

const FetchMachine = () => {
  const [state, send] = useMachine(machine);
  console.log(state);

  return (
    <div>
      <h1>Fetch Machine</h1>
      <h3>{state.value}</h3>
      {state.value === "failure" && (
        <button
          onClick={() => {
            send("FETCH_AGAIN");
          }}
        >
          Fetch again
        </button>
      )}
    </div>
  );
};

export default FetchMachine;
