// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.tsx

import * as React from "react";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from "../pokemon";

import type { PokemonData } from "../types";

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(null);
  // 💯 Create a variable for the error state
  const [error, setError] = React.useState<Error | null>(null);

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
    return <span>Submit a pokemon</span>;
  }

  if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  return <PokemonDataView pokemon={pokemon} />;
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName: string) {
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

export { App };
