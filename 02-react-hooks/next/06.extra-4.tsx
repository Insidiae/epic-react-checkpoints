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

// 💯 Create an ErrorBoundary component
// 📜 https://reactjs.org/docs/error-boundaries.html
type ErrorBoundaryProps = {
  FallbackComponent: React.FunctionComponent<{ error: Error }>;
};
type ErrorBoundaryState = {
  error: null | Error;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <this.props.FallbackComponent error={error} />;
    }

    return this.props.children;
  }
}

type PokemonInfoState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "rejected"; error: Error }
  | { status: "resolved"; pokemon: PokemonData };

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
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
    // 💯 Instead of rendering the error within the PokemonInfo component,
    // you’ll need to throw error right in the function
    // 💰 if (status === 'rejected') throw error
    case "rejected":
      throw state.error;
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    default:
      throw new Error("This should be impossible");
  }
}

// 💯 Extract the component to be displayed when there is an error
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  );
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
        {/* 💯 Use the ErrorBoundary to handle this and any other error
         for the PokemonInfo component. */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export { App };
