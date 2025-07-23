// fetch data from "https://pokeapi.co/api/v2/pokemon" with limit of 50
export async function fetchData() {
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
}

const populate = async (data) => {
  const container = document.querySelector(".container");
  container.classList.add("my-8");

  const pokemonContainer = document.getElementById("pokemon-container");

  pokemonContainer.classList.add("mx-auto", "my-0", "text-center");

  // array of pokemon object with name url
  const results = data.results;

  //arrays of pokemon objects with name property and url property for fetching information about this pokemon

  // map the results array of objects with properties(name and url) to array of promises
  // note: inside an async function,when you return a value, it automatically gets wrapped in a promise
  const pokemonDataPromises = results.map(async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(
          `Error fetching data from the Pokémon with the name ${pokemon.name}`
        );
      }
      const data = await response.json();
      return { name: pokemon.name, data: data };
    } catch (error) {
      console.error(error);
      return null; // Return null for failed fetches so Promise.all() doesn't reject
    }
  });

  //  Promise.all() waits for ALL promises in the array to resolve, then returns an array with all resolved objects{name,data}
  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  // filter out null pokemons inside the array
  const allPokemonData = pokemonDataArray.filter(
    (pokemonData) => pokemonData !== null
  );

  return allPokemonData;
};
export { populate };
