// useContext: Caching response data in context
// 💯 Remove context (exercise)
// http://localhost:3000/isolated/exercise/03.extra-2.tsx

import * as React from "react";
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from "../pokemon";
import type { PokemonData } from "../types";
import { useAsync } from "../utils";

// 💯 Delete the createContext, usePokemonCache, and PokemonCacheProvider stuff
// 💥 type PokemonCacheContextType = [
// 💥   PokemonCacheState,
// 💥   React.Dispatch<PokemonCacheAction>,
// 💥 ]
// 💥 const PokemonCacheContext =
// 💥   React.createContext<PokemonCacheContextType>(undefined)

type PokemonCacheState = Record<string, PokemonData>;

type PokemonCacheAction = {
  type: "ADD_POKEMON";
  pokemonName: string;
  pokemonData: PokemonData;
};

function pokemonCacheReducer(
  state: PokemonCacheState,
  action: PokemonCacheAction
) {
  switch (action.type) {
    case "ADD_POKEMON": {
      return { ...state, [action.pokemonName]: action.pokemonData };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// 💥 function PokemonCacheProvider({children}: {children: React.ReactNode}) {
// 💥   const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
// 💥   return (
// 💥     <PokemonCacheContext.Provider value={[cache, dispatch]}>
// 💥       {children}
// 💥     </PokemonCacheContext.Provider>
// 💥   )
// 💥 }

// 💥 function usePokemonCache() {
// 💥   const context = React.useContext(PokemonCacheContext)
// 💥   if (!context) {
// 💥     throw new Error(
// 💥       'usePokemonCache must be used within a PokemonCacheProvider',
// 💥     )
// 💥   }
// 💥   return context
// 💥 }

function PokemonSection({ onSelect, pokemonName }) {
  // 💯 Do the const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  // directly inside the PokemonSection component.
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {});

  return (
    // 💥 <PokemonCacheProvider>
    <div style={{ display: "flex" }}>
      <PreviousPokemon onSelect={onSelect} cache={cache} />
      <div className="pokemon-info" style={{ marginLeft: 10 }}>
        <PokemonErrorBoundary
          onReset={() => onSelect("")}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo
            pokemonName={pokemonName}
            cache={cache}
            dispatch={dispatch}
          />
        </PokemonErrorBoundary>
      </div>
    </div>
    // 💥 </PokemonCacheProvider>
  );
}

function PokemonInfo({
  pokemonName,
  cache,
  dispatch,
}: {
  pokemonName: string;
  cache: PokemonCacheState;
  dispatch: React.Dispatch<PokemonCacheAction>;
}) {
  const {
    data: pokemon,
    status,
    error,
    run,
    setData,
  } = useAsync<PokemonData>();

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName]);
    } else {
      run(
        fetchPokemon(pokemonName).then((pokemonData) => {
          dispatch({ type: "ADD_POKEMON", pokemonName, pokemonData });
          return pokemonData;
        })
      );
    }
  }, [cache, dispatch, pokemonName, run, setData]);

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

function PreviousPokemon({
  onSelect,
  cache,
}: {
  onSelect: (name: string) => void;
  cache: PokemonCacheState;
}) {
  return (
    <div>
      Previous Pokemon
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {Object.keys(cache).map((pokemonName) => (
          <li key={pokemonName} style={{ margin: "4px auto" }}>
            <button
              style={{ width: "100%" }}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null);

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName);
  }

  function handleSelect(newPokemonName: string) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  );
}

export default App;
