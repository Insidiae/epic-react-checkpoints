// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from "react";
import "../box-styles.css";

// 💯 Try to make a custom <Box /> component that renders a div,
// accepts all the props and merges the given style
// and className props with the shared values.
// 💯 I should be able to use it like so:
//   <Box className="box--small" style={{backgroundColor: 'lightblue'}}>
//     small lightblue box
//   </Box>

function Box({ className = "", style, ...otherProps }) {
  return (
    <div
      className={`box ${className}`}
      style={{ fontStyle: "italic", ...style }}
      {...otherProps}
    />
  );
}

const smallBox = (
  <Box className="box--small" style={{ backgroundColor: "lightblue" }}>
    small lightblue box
  </Box>
);
const mediumBox = (
  <Box className="box--medium" style={{ backgroundColor: "pink" }}>
    medium pink box
  </Box>
);
const largeBox = (
  <Box className="box--large" style={{ backgroundColor: "orange" }}>
    large orange box
  </Box>
);

function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
    </div>
  );
}

export default App;
