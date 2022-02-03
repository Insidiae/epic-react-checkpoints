// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";

function Name() {
  // 💯 push the state back down to the Name component
  const [name, setName] = React.useState("");

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  );
}

function FavoriteAnimal({ animal, onAnimalChange }) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  );
}

// 💯 here's the new component we got from Peter:
function Display({ animal }) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

// 💣 remove this component in favor of the new one
// 💥 function Display({name, animal}) {
// 💥   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// 💥 }

function App() {
  // 💣 delete this, it's now managed by the Name component
  // 💥 const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState("");

  return (
    <form>
      {/* 💯 remove the name and onNameChange props here */}
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      {/* 💯 remove the name prop here */}
      <Display animal={animal} />
    </form>
  );
}

export default App;
