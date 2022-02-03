// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  // 💯 Create a variable for the error state
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setPokemon(null);

    // 💯 Remember to clear the error state before calling `fetchPokemon`
    setError(null);

    // 💯 Handle promise errors
    // option 1: using .catch
    // fetchPokemon(pokemonName)
    // .then(pokemon => setPokemon(pokemon))
    // .catch(error => setError(error))

    // option 2: using the second argument to .then
    fetchPokemon(pokemonName).then(
      (pokemon) => setPokemon(pokemon),
      (error) => setError(error)
    );
  }, [pokemonName]);

  // 💯 If there's an error, render the ff.:
  if (error) {
    return (
      <div role="alert">
        There was an error:{" "}
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    );
  }

  if (!pokemonName) {
    return "Submit a pokemon";
  }

  if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  return <PokemonDataView pokemon={pokemon} />;
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
