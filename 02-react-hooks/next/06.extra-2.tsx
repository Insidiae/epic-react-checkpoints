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

type Status = "idle" | "pending" | "resolved" | "rejected";

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  // 💯 Create a state to set the explicit status of our component
  // 💰 Our component can be in the following "states":
  //   idle: no request made yet
  //   pending: request started
  //   resolved: request successful
  //   rejected: request failed
  const [status, setStatus] = React.useState<Status>("idle");

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    // 💯 Try to use the status state by setting it to the string values
    // rather than relying on existing state or booleans.
    setStatus("pending");

    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setPokemon(pokemon);
        setStatus("resolved");
      },
      (error) => {
        setError(error);
        setStatus("rejected");
      }
    );
  }, [pokemonName]);

  // 💯 Render the appropriate components depending on the status
  switch (status) {
    case "idle":
      return <span>Submit a pokemon</span>;
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
