// Cache resources
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from "../pokemon";
import { createResource } from "../utils";

function PokemonInfo({ pokemonResource }) {
  const pokemon = pokemonResource.read();
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
}

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
};

const PokemonResourceCacheContext = React.createContext();

// 💯 Make the `PokemonCacheProvider` accept a `cacheTime` prop
// (go ahead and set it to 5000)
function PokemonCacheProvider({ children, cacheTime = 5000 }) {
  const cache = React.useRef({});
  // 💯 Figure out a good way to clear items in the cache when they’ve been
  // around for longer than the cache time.
  const expirations = React.useRef({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      for (const [name, time] of Object.entries(expirations.current)) {
        if (time < Date.now()) {
          delete cache.current[name];
          delete expirations.current[name];
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getPokemonResource = React.useCallback(
    (name) => {
      const lowerName = name.toLowerCase();
      let resource = cache.current[lowerName];
      if (!resource) {
        resource = createPokemonResource(lowerName);
        cache.current[lowerName] = resource;
      }

      expirations.current[lowerName] = Date.now() + cacheTime;

      return resource;
    },
    [cacheTime]
  );

  return (
    <PokemonResourceCacheContext.Provider value={getPokemonResource}>
      {children}
    </PokemonResourceCacheContext.Provider>
  );
}

function usePokemonResourceCache() {
  return React.useContext(PokemonResourceCacheContext);
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName));
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG);
  const [pokemonResource, setPokemonResource] = React.useState(null);
  const getPokemonResource = usePokemonResourceCache();

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null);
      return;
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName));
    });
  }, [pokemonName, startTransition, getPokemonResource]);

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? "pokemon-loading" : ""}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          "Submit a pokemon"
        )}
      </div>
    </div>
  );
}

function AppWithProvider() {
  return (
    <PokemonCacheProvider>
      <App />
    </PokemonCacheProvider>
  );
}

export default AppWithProvider;
