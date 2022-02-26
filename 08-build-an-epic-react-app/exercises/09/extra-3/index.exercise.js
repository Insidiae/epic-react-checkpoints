import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import ReactDOM from "react-dom";
import { Profiler } from "components/profiler";
import { App } from "./app";
import { AppProviders } from "./context";

loadDevTools(() => {
  ReactDOM.render(
    // 💯 Wrap everything in the `Profiler` we just made
    <Profiler id="App Root" phases={["mount"]}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
    document.getElementById("root")
  );
});
