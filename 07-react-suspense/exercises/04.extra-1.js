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

const pokemonResourceCache = {};

// 💯 Move this cache (more specifically the `getPokemonResource` function)
// into context
function getPokemonResource(name) {
  const lowerName = name.toLowerCase();
  let resource = pokemonResourceCache[lowerName];
  if (!resource) {
    resource = createPokemonResource(lowerName);
    pokemonResourceCache[lowerName] = resource;
  }

  return resource;
}
// 💰 You can simply pass the `getPokemonResource` as the `defaultValue`
// for your `React.createContext` call
const PokemonResourceCacheContext = React.createContext(getPokemonResource);

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
  // 💯 Use `React.useContext` to get the function
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

export default App;
