import { useState } from "react";

function useMachine(machine) {
  const [currentStateOfTheMachine, setCurrentStateOfTheMachine] = useState(
    machine.initial
  );

  const [context, setContext] = useState(machine.context);

  if (machine.states[currentStateOfTheMachine].invoke) {
    const { src, onDone, onError } =
      machine.states[currentStateOfTheMachine].invoke;
    src(context)
    .then((response) => response.json())
    .then((json) => {
        setCurrentStateOfTheMachine(onDone.target);
        const updatedPieceOfContext = onDone.actions(context, json);
        setContext({ ...context, ...updatedPieceOfContext });
    })
    .catch((err) => {
        console.error(err)
        setCurrentStateOfTheMachine(onError.target);

    });

  }

  function send(event) {
    const eventDefinitionInCurrentState =
      machine.states[currentStateOfTheMachine].on[event];
    if (eventDefinitionInCurrentState) {
      // Execute actions
      const { actions, target } = eventDefinitionInCurrentState;
      target && setCurrentStateOfTheMachine(target);
      if (actions) {
        const updatedContext = actions(context);
        setContext((context) => ({ ...context, ...updatedContext }));
      }
    }
  }

  const state = { value: currentStateOfTheMachine, context };

  return [state, send];
}

export default useMachine;
