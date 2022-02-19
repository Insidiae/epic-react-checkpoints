// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";
// 💯 Refactor your code to use `createResource` from `utils.js`...
import { createResource } from "../utils";
// 💯 ...and `PokemonInfoFallback` from the `src/pokemon.js`
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from "../pokemon";

// 💯 Remove this in favor of the imported `createResource`
// function createResource(promise) {
//   let status = 'pending'
//   let result = promise.then(
//     resolved => {
//       status = 'resolved'
//       result = resolved
//     },
//     rejected => {
//       status = 'rejected'
//       result = rejected
//     },
//   )

//   return {
//     read() {
//       switch (status) {
//         case 'pending':
//           throw result
//         case 'rejected':
//           throw result
//         case 'resolved':
//           return result
//         default:
//           throw new Error('This should be impossible!')
//       }
//     },
//   }
// }

const pokemonResource = createResource(fetchPokemon("pikachu"));

function PokemonInfo() {
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
          {/* 💯 Use the `PokemonInfoFallback` as the fallback for `React.Suspense` */}
          {/* <React.Suspense fallback={<div>Loading Pokemon...</div>}> */}
          <React.Suspense fallback={<PokemonInfoFallback name="Pikachu" />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

export default App;
