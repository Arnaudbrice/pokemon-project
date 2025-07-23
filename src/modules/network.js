import { catchPokemon } from "./catchFunction.js";

/**
 * Fetches data from the Pokémon API (https://pokeapi.co/api/v2/pokemon)
 *
 * This function retrieves a list of Pokémon from the API, limited to 50 entries.
 * If the fetch operation fails or the response is not OK, it logs the error and returns null.
 *
 * @returns {Promise<Object|null>} A promise that resolves to the fetched data object or null if an error occurs.
 */
export const fetchData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) {
      throw new Error(
        `Error fetching data from the Pokémon API with status ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetches detailed data for each Pokémon from the provided URLs.
 *
 * @param {Array<Object>} results - An array of Pokémon objects containing URLs.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of Pokémon data objects.
 */
const fetchPokemonData = async (results) => {
  const pokemonDataPromises = results.map(async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(`Error fetching data for ${pokemon.name}`);
      }
      const data = await response.json();
      return { name: pokemon.name, data: data };
    } catch (error) {
      console.error(error);
      return null; // Return null for failed fetches
    }
  });

  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  return pokemonDataArray.filter((pokemonData) => pokemonData !== null);
};

/**
 * Populates the Pokémon container with data and applies necessary styles.
 *
 * @param {Object} data - The data object containing an array of Pokémon.
 * @returns {Promise<void>}
 */
const populate = async (data) => {
  const container = document.querySelector(".container");
  container.classList.add("my-8");

  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.classList.add("mx-auto", "my-0", "text-center");

  const allPokemonData = await fetchPokemonData(data.results);
  return allPokemonData;
};
export { populate };
