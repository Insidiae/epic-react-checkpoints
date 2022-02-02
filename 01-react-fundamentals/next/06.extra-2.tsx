// Styling
// http://localhost:3000/isolated/exercise/06.tsx

import * as React from "react";
import "../box-styles.css";

// 💯 Try to make this API work:
//   <Box size="small" style={{backgroundColor: 'lightblue'}}>
//     small lightblue box
//   </Box>

function Box({
  size,
  className = "",
  style = {},
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "small" | "medium" | "large";
}) {
  const sizeClassName = size ? `box--${size}` : "";
  return (
    <div
      className={`box ${className} ${sizeClassName}`}
      style={{ fontStyle: "italic", ...style }}
      {...otherProps}
    />
  );
}

const smallBox = (
  <Box size="small" style={{ backgroundColor: "lightblue" }}>
    small lightblue box
  </Box>
);
const mediumBox = (
  <Box size="medium" style={{ backgroundColor: "pink" }}>
    medium pink box
  </Box>
);
const largeBox = (
  <Box size="large" style={{ backgroundColor: "orange" }}>
    large orange box
  </Box>
);

const sizelessColorlessBox = <Box>sizeless colorless box</Box>;

function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
      {sizelessColorlessBox}
    </div>
  );
}

export { App };
