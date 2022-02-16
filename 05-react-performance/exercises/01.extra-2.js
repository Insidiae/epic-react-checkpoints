// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

// 💯 You can use webpack magic comments to have webpack
// instruct the browser to prefetch dynamic imports:
const Globe = React.lazy(() => import(/* webpackPrefetch: true */ "../globe"));

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
      }}
    >
      <label
        style={{ marginBottom: "1rem" }}
        // 💣 Remove the event handlers here.
        // We're prefetching the globe now so we don't need them!
        // 💥 onMouseEnter={loadGlobe}
        // 💥 onFocus={loadGlobe}
      >
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={(e) => setShowGlobe(e.target.checked)}
        />
        {" show globe"}
      </label>
      <div style={{ width: 400, height: 400 }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
