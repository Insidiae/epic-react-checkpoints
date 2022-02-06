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

// 🦺 I'd change "PokemonState" to "AsyncState"
// Also rename the "pokemon" property to a more generic name like "data"
// 🦺 Also, now that we're making a "generic" hook,
// we'll want this type to be a generic that takes a DataType and uses that
// instead of "PokemonData"
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

// 🦺 similar to above, this will need to be a generic type now and rename "pokemon" to "data"
// I'd also recommend renaming this
type AsyncAction<DataType> =
  | { type: "reset" }
  | { type: "pending" }
  | { type: "resolved"; data: DataType }
  | { type: "rejected"; error: Error };

// 🐨 this is going to be our generic asyncReducer
// 🦺 make this function a generic that accepts a DataType and passes that to
// your AsyncState and AsyncAction types
function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
): AsyncState<DataType> {
  switch (action.type) {
    case "pending": {
      // 🐨 replace "pokemon" with "data"
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      // 🐨 replace "pokemon" with "data"
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync<DataType>(
  asyncCallback: () => Promise<DataType> | null,
  initialState: AsyncState<DataType>,
  dependencies: Array<unknown>
) {
  const [state, dispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: "idle",
    // 🐨 this will need to be "data" instead of "pokemon"
    data: null,
    error: null,
    ...initialState,
  });

  React.useEffect(() => {
    // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
    // const promise = asyncCallback()
    // if (!promise) {
    //   return
    // }
    // then you can dispatch and handle the promise etc...
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
    // 🐨 you'll accept dependencies as an array and pass that here.
    // 🐨 because of limitations with ESLint, you'll need to ignore
    // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  // 🐨 move all the code between the lines into a new useAsync function.
  // 💰 look below to see how the useAsync hook is supposed to be called
  // 🦺 useAsync will need to be a generic that takes the DataType which can
  // be inferred from the asyncCallback.
  // 💰 If you want some help, here's the function signature (or delete this
  // comment really quick if you don't want the spoiler)!
  // function useAsync<DataType>(
  //   asyncCallback: () => Promise<DataType> | null,
  //   dependencies: Array<unknown>,
  // ) {/* code in here */}

  // -------------------------- start --------------------------

  // 💥 const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
  // 💥   status: 'idle',
  // 💥   pokemon: null,
  // 💥   error: null,
  // 💥 })

  // 💥 React.useEffect(() => {
  // 💥   if (!pokemonName) {
  // 💥     return
  // 💥   }
  // 💥   dispatch({type: 'pending'})
  // 💥   fetchPokemon(pokemonName).then(
  // 💥     pokemon => {
  // 💥       dispatch({type: 'resolved', pokemon})
  // 💥     },
  // 💥     error => {
  // 💥       dispatch({type: 'rejected', error})
  // 💥     },
  // 💥   )
  // 💥 }, [pokemonName])

  // --------------------------- end ---------------------------

  // 🐨 here's how you'll use the new useAsync hook you're writing:
  // const state = useAsync(() => {
  //   if (!pokemonName) {
  //     return
  //   }
  //   return fetchPokemon(pokemonName)
  // }, [pokemonName])
  const state = useAsync<PokemonData>(
    () => {
      if (!pokemonName) {
        return;
      }
      return fetchPokemon(pokemonName);
    },
    { status: pokemonName ? "pending" : "idle" },
    [pokemonName]
  );
  // 🐨 this will change from "pokemon" to "data"
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
