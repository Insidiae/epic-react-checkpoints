// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.tsx

import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
// 🦺 react-error-boundary also provides some common types for its components
import type { FallbackProps } from "react-error-boundary";
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
  const [state, setState] = React.useState<PokemonInfoState>({
    status: pokemonName ? "pending" : "idle",
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
      throw state.error;
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    default:
      throw new Error("This should be impossible");
  }
}

// 💯 Add a `resetErrorBoundary` prop to this component
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      {/* 💯 Add a "try again" button that calls `resetErrorBoundary` on click */}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName);
  }

  // 💯 Add a `handleReset` function that can `setPokemonName` to an empty string
  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* 💯 Remove the `key` prop and replace it with an `onReset` prop */}
        <ErrorBoundary onReset={handleReset} FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export { App };
