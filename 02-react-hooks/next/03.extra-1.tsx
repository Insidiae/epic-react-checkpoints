// Lifting state
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from "react";

// 💯 push the state back down to the Name component
function Name() {
  const [name, setName] = React.useState("");
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
    </div>
  );
}

function FavoriteAnimal({
  animal,
  onAnimalChange,
}: {
  animal: string;
  onAnimalChange: (newAnimal: string) => void;
}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={(event) => onAnimalChange(event.currentTarget.value)}
      />
    </div>
  );
}

// 💯 here's the new component we got from Peter:
function Display({ animal }: { animal: string }) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

// 💣 remove this component in favor of the new one
// 💥 function Display({name, animal}: {name: string; animal: string}) {
// 💥   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// 💥 }

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState("");
  // 💣 delete this, it's now managed by the Name component
  // 💥 const [name, setName] = React.useState('')
  return (
    <form>
      {/* 💯 remove the name and onNameChange props here */}
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      {/* 💯 remove the name prop here */}
      <Display animal={animal} />
    </form>
  );
}

export { App };
