// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.js

import * as React from "react";
import VanillaTilt from "vanilla-tilt";

// 💯 If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

// 💣 Refactor this class component into hooks
// 💥 class Tilt extends React.Component {
// 💥   tiltRef = React.createRef()
// 💥   componentDidMount() {
// 💥     const tiltNode = this.tiltRef.current
// 💥     const vanillaTiltOptions = {
// 💥       max: 25,
// 💥       speed: 400,
// 💥       glare: true,
// 💥       'max-glare': 0.5,
// 💥     }
// 💥     VanillaTilt.init(tiltNode, vanillaTiltOptions)
// 💥   }
// 💥   componentWillUnmount() {
// 💥     this.tiltRef.current.vanillaTilt.destroy()
// 💥   }
// 💥   render() {
// 💥     return (
// 💥       <div ref={this.tiltRef} className="tilt-root">
// 💥         <div className="tilt-child">{this.props.children}</div>
// 💥       </div>
// 💥     )
// 💥   }
// 💥 }

function Tilt({ children }) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef();

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  React.useEffect(() => {
    // 💰 like this:
    // const tiltNode = tiltRef.current
    // VanillaTilt.init(tiltNode, {
    //   max: 25,
    //   speed: 400,
    //   glare: true,
    //   'max-glare': 0.5,
    // })
    const tiltNode = tiltRef.current;
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    };
    VanillaTilt.init(tiltNode, vanillaTiltOptions);

    // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
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

export default App;
