// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
} from "../pokemon";

// 💯 Try to refactor your code a bit to have a resource factory we can use
// for all our async needs.
// let pokemon
// let pokemonError

// const pokemonPromise = fetchPokemon('pikachu').then(
//   pokemonData => {
//     pokemon = pokemonData
//   },
//   error => {
//     pokemonError = error
//   },
// )
function createResource(promise) {
  let status = "pending";
  let result = promise.then(
    (resolved) => {
      status = "resolved";
      result = resolved;
    },
    (rejected) => {
      status = "rejected";
      result = rejected;
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw result;
        case "rejected":
          throw result;
        case "resolved":
          return result;
        default:
          throw new Error("This should be impossible!");
      }
    },
  };
}

// 💰 This is also a JavaScript refactor, but in this case we want to make
// a generic “resource factory” which has the following API:
// const resource = createResource(someAsyncThing())

// function MyComponent() {
//   const myData = resource.read()
//   // render myData stuff
// }
const pokemonResource = createResource(fetchPokemon("pikachu"));

function PokemonInfo() {
  // if (pokemonError) {
  //   throw pokemonError
  // }

  // if (!pokemon) {
  //   throw pokemonPromise
  // }
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

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
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
