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

// 💰 This one is a bit tricky, so I’m going to give you
// the type updates for our reducer’s State and Action types:
type AsyncState<DataType> =
  | {
      status: "idle";
      data?: null;
      error?: null;
      promise?: null;
    }
  | {
      status: "pending";
      data?: null;
      error?: null;
      promise: Promise<DataType>;
    }
  | {
      status: "resolved";
      data: DataType;
      error: null;
      promise: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
      promise: null;
    };

type AsyncAction<DataType> =
  | { type: "reset" }
  | { type: "pending"; promise: Promise<DataType> }
  | { type: "resolved"; data: DataType; promise: Promise<DataType> }
  | { type: "rejected"; error: Error; promise: Promise<DataType> };

// 💯 Keep track of the latest promise in our state object
// and only update the state if the dispatch is coming from the latest promise
function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
): AsyncState<DataType> {
  switch (action.type) {
    case "pending": {
      return {
        status: "pending",
        data: null,
        error: null,
        promise: action.promise,
      };
    }
    case "resolved": {
      if (action.promise !== state.promise) {
        return state;
      }
      return {
        status: "resolved",
        data: action.data,
        error: null,
        promise: null,
      };
    }
    case "rejected": {
      if (action.promise !== state.promise) {
        return state;
      }
      return {
        status: "rejected",
        data: null,
        error: action.error,
        promise: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync<DataType>() {
  const [state, dispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
  });

  const { data, error, status } = state;

  const run = React.useCallback((promise: Promise<DataType>) => {
    dispatch({ type: "pending", promise });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data, promise });
      },
      (error) => {
        dispatch({ type: "rejected", error, promise });
      }
    );
  }, []);

  return {
    error,
    status,
    data,
    run,
  };
}

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const { data: pokemon, status, error, run } = useAsync<PokemonData>();

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    // 💯 Update this line to simulate the race condition
    // const pokemonPromise = fetchPokemon(pokemonName)
    const pokemonPromise = fetchPokemon(pokemonName, {
      delay: Math.random() * 5000,
    });
    run(pokemonPromise);
  }, [pokemonName, run]);

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
