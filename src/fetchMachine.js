const fetchTodosGood = (context) => {
  return fetch("https://jsonplaceholder.typicode.com/todos/1");
  // .then((response) => response.json())
  // .then((json) => {
  //   return json;
  // })
  // .catch((err) => {
  //   return err;
  // });
};

const fetchTodosBad = (context) => {
  return fetch("https://jsonplaceholder.typiicode.com/todos/1");
};

const setTodoToContext = (context, jsonData) => {
  return {
    todo: jsonData,
  };
};

const machine = {
  initial: "fetchTodosBad",
  context: {},
  states: {
    fetchTodosBad: {
      invoke: {
        src: fetchTodosBad,
        onDone: {
          actions: setTodoToContext,
          target: "success",
        },
        onError: {
          target: "failure",
        },
      },
    },
    fetchTodosGood: {
      invoke: {
        src: fetchTodosGood,
        onDone: {
          actions: setTodoToContext,
          target: "success",
        },
        onError: {
          target: "failure",
        },
      },
    },
    success: {},
    failure: {
      on: {
        FETCH_AGAIN: {
          target: "fetchTodosGood",
        },
      },
    },
  },
};

export default machine;
