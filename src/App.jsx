import React from "react";
import FetchMachine from "./FetchMachine";
import Machine from "./Machine";

const App = () => {
  return (
    <div>
      <Machine />
      <hr />
      <hr />

      <FetchMachine />
    </div>
  );
};

export default App;
