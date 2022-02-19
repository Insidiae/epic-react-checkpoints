// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";
// 💰 We’ve got an PokemonErrorBoundary component all built-out for you:
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
} from "../pokemon";

let pokemon;
// 💯 You’ll need a handler to get access to the error object
let pokemonError;

const pokemonPromise = fetchPokemon("pikachu");
// 💯 What happens if you mistype `pikachu` and instead try to request `pikacha`?
// const pokemonPromise = fetchPokemon('pikacha')

pokemonPromise.then(
  (pokemonData) => {
    pokemon = pokemonData;
  },
  (error) => {
    pokemonError = error;
  }
);

function PokemonInfo() {
  // 💯 Instead of using the error object in your JSX,
  // you can simply throw it in your render method
  if (pokemonError) {
    throw pokemonError;
  }

  if (!pokemon) {
    throw pokemonPromise;
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 💯 Wrap everything in the PokemonErrorBoundary */}
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>Loading Pokemon...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

export default App;
