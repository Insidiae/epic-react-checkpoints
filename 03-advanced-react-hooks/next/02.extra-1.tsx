// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.tsx

import * as React from "react";
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from "../pokemon";
import { PokemonData } from "../types";

type AsyncState<DataType> =
  | {
      status: "idle";
      data?: null;
      error?: null;
    }
  | {
      status: "pending";
      data?: null;
      error?: null;
    }
  | {
      status: "resolved";
      data: DataType;
      error: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | { type: "reset" }
  | { type: "pending" }
  | { type: "resolved"; data: DataType }
  | { type: "rejected"; error: Error };

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
): AsyncState<DataType> {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync<DataType>(
  asyncCallback: () => Promise<DataType> | null,
  initialState: AsyncState<DataType>
) {
  const [state, dispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  React.useEffect(() => {
    const promise = asyncCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: "pending" });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data });
      },
      (error) => {
        dispatch({ type: "rejected", error });
      }
    );
  }, [asyncCallback]);

  return state;
}

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  // 💯 See if you can make things work like this:
  // 🐨 you'll need to wrap asyncCallback in React.useCallback
  // function asyncCallback() {
  //   if (!pokemonName) {
  //     return
  //   }
  //   return fetchPokemon(pokemonName)
  // }
  const asyncCallback = React.useCallback(() => {
    if (!pokemonName) {
      return;
    }
    return fetchPokemon(pokemonName);
  }, [pokemonName]);

  // 🐨 you'll need to update useAsync to remove the dependencies and list the
  // async callback as a dependency.
  const state = useAsync<PokemonData>(asyncCallback, {
    status: pokemonName ? "pending" : "idle",
  });

  const { data: pokemon, status, error } = state;

  switch (status) {
    case "idle":
      return <span>Submit a pokemon</span>;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "rejected":
      throw error;
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

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}
export default App;
