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

type PokemonInfoState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "rejected"; error: Error }
  | { status: "resolved"; pokemon: PokemonData };

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  // 💯 See if you can figure out how to store all of your state
  // in a single object with a single `React.useState` call
  // so I can update my state like this:
  // 💰 setState({status: 'resolved', pokemon})
  const [state, setState] = React.useState<PokemonInfoState>({
    status: "idle",
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({ status: "pending" });

    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setState({ status: "resolved", pokemon });
      },
      (error) => {
        setState({ status: "rejected", error });
      }
    );
  }, [pokemonName]);

  switch (state.status) {
    case "idle":
      return <span>Submit a pokemon</span>;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "rejected":
      return (
        <div role="alert">
          There was an error:{" "}
          <pre style={{ whiteSpace: "normal" }}>{state.error.message}</pre>
        </div>
      );
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
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
