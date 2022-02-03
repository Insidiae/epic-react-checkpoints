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
  // 💯 See if you can figure out how to store all of your state
  // in a single object with a single `React.useState` call
  // so I can update my state like this:
  // 💰 setState({status: 'resolved', pokemon})
  const [state, setState] = React.useState({
    status: "idle",
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({ status: "pending" });

    fetchPokemon(pokemonName).then(
      (pokemon) => setState({ status: "resolved", pokemon }),
      (error) => setState({ status: "rejected", error })
    );
  }, [pokemonName]);

  switch (status) {
    case "idle":
      return "Submit a pokemon";
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "rejected":
      return (
        <div role="alert">
          There was an error:{" "}
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      );
    case "resolved":
      return <PokemonDataView pokemon={pokemon} />;
    default:
      throw new Error("This should be impossible");
  }
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
