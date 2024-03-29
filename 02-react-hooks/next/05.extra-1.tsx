// DOM Side-Effects
// 💯 Side-effect cleanup
// http://localhost:3000/isolated/exercise/05.tsx

import * as React from "react";
import VanillaTilt from "vanilla-tilt";

// 🦺 Since VanillaTilt adds event handlers and stuff to the DOM node,
// we need to create an interface that extends the element
// with VanillaTilt's stuff.
interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt;
}

function Tilt({ children }: { children: React.ReactNode }) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef<HTMLVanillaTiltElement>(null);

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  React.useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode === null) return;
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    };
    VanillaTilt.init(tiltNode, vanillaTiltOptions);

    // 🐨 Don't forget to return a cleanup function. VanillaTilt.init will add an
    // object to your DOM node to cleanup:
    // `return () => tiltNode.vanillaTilt.destroy()`
    return () => {
      tiltNode.vanillaTilt.destroy();
    };

    // 💰 Don't forget to specify your effect's dependencies array! In our case
    // we know that the tilt node will never change, so make it `[]`. Ask me about
    // this for a more in depth explanation.
  }, []);

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  );
}

export { App };
