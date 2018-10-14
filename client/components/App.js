import React from "react";

import UntitledEditor from "./UntitledEditor";
import CountdownTimer from "./CountdownTimer";

const App = _ => (
  <div>
    <CountdownTimer endDate={1539514800} />
    <UntitledEditor />
  </div>
);

export default App;
