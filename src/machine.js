function incrementContextByTwo(context) {
  return {
    count: context.count + 2,
  };
}

function incrementContextByOne(context) {
  return {
    count: context.count + 1,
  };
}

const machine = {
  initial: "one",
  context: {
    count: 0,
  },
  states: {
    one: {
      on: {
        INCREMENT: {
          actions: incrementContextByOne,
        },
        TRANSITION_TO_TWO: {
          target: "two",
        },
      },
    },
    two: {
      on: {
        INCREMENT: {
          actions: incrementContextByTwo,
        },
        TRANSITION_TO_ONE: {
          target: "one",
        },
      },
    },
  },
};

let currentStateOfTheMachine = machine.initial;

function send(event) {
  const eventDefinitionInCurrentState =
    machine.states[currentStateOfTheMachine].on[event];
  if (eventDefinitionInCurrentState) {
    // Execute actions
    const { actions, target } = eventDefinitionInCurrentState;
    target && (currentStateOfTheMachine = target);
    actions && actions();
  }
}

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

// send("INCREMENT");
// console.log("FIRED INCREMENT EVENT");

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

// send("TRANSITION_TO_ONE");
// console.log("FIRED TRANSITION_TO_ONE EVENT");

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

// send("TRANSITION_TO_TWO");
// console.log("FIRED TRANSITION_TO_TWO EVENT");

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

// send("INCREMENT");
// console.log("FIRED INCREMENT EVENT");

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

// send("TRANSITION_TO_ONE");
// console.log("FIRED TRANSITION_TO_ONE EVENT");

// console.log(`current state of the machine is: ${currentStateOfTheMachine}`);

// console.log(`The context value the machine is : ${machine.context.count}`);

export default machine;
