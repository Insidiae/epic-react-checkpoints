import * as React from "react";
import { client } from "utils/api-client";

// 💯 We don't want to send the profile data every single render,
// so batch these data to be sent every 5 seconds.
let queue = [];

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({ success: true });
  }

  // 💯 Send the data for the profile in a `POST` request to `/profile`
  // (`client('profile', {body: data}))`)
  const queueToSend = [...queue];
  queue = [];
  client("profile", { data: queueToSend });
}

setInterval(sendProfileQueue, 5000);

// 💯 Create a `Profiler` component with the following API:
//  <Profiler id="Unique Identifier" metadata={{extra: 'info for the report'}}>
//    <Components />
//    <To />
//    <Be />
//    <Profiled />
//  </Profiler>
function Profiler({ phases, metadata, ...props }) {
  function reportProfile(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
    }
  }

  return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };
