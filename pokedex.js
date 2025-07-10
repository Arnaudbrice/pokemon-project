document.body.style.backgroundColor = "#faf7f4";
document.body.style.backgroundImage =
  'url("https://transparenttextures.com/patterns/asfalt-dark.png")';

document.body.style.fontFamily = "Afacad Flux, Afacad, sans-serif";
document.body.style.lineHeight = "1.5";
const fetchData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) {
      throw new Error(
        `Error fetching data from the Pokémon API with status ${response.status}`
      );
    }

    const data = await response.json();

    const allPokemonDataArray = await populate(data);
    searchPokemon(allPokemonDataArray);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

const populate = async (data) => {
  const results = data.results;

  //arrays of pokemon objects with name property and url property for fetching information about this pokemon
  // console.log("results", results);
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
  // console.log("pokemonDataPromises", pokemonDataPromises);
  //  Promise.all() waits for ALL promises in the array to resolve, then returns an array with all resolved objects{name,data}
  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  // filter out null pokemons inside the array
  allPokemonData = pokemonDataArray.filter(
    (pokemonData) => pokemonData !== null
  );
  return allPokemonData;
};
const searchPokemon = (allPokemon) => {
  // --------------------------------------- search function ---------------------------------------------------------------------------
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchResult = document.getElementById("search-result");

  // --- creat a cancel btn for search ---
  const searchCancelBtn = document.createElement("button");
  searchCancelBtn.textContent = "cancel";
  searchCancelBtn.classList.add(
    "cancel-btn",
    "border-1",
    "border-[#362717]",
    "my-2",
    "rounded-md",
    "shadow-md",
    "hover:cursor-pointer"
  );

  // --- click of search --
  searchBtn.addEventListener("click", () => {
    searchResult.classList.remove("hidden");
    const searchContent = searchInput.value.trim().toLowerCase();

    // -- found the Pokemon and display --
    const foundPokemon = allPokemon.find(
      (pokemon) =>
        pokemon.data.name === searchContent ||
        pokemon.data.id.toString() === searchContent
    );

    if (!foundPokemon) {
      searchResult.textContent = "please enter a name od ID!";
      searchResult.classList.add("flex", "flex-col");
      searchResult.appendChild(searchCancelBtn);
      return;
    }
    // ---------------- display search result ---------------
    const foundPokemonType = foundPokemon.data.types
      .map((type) => type.type.name)
      .join(", ");
    const temp = `<ul class="result-container flex flex-col font-bold items-center">
    <li> ID : ${foundPokemon.data.id}</li>
    <li> name: ${foundPokemon.name}</li>
    <li><img src="${foundPokemon.data.sprites.other.dream_world.front_default}" alt="${foundPokemon.name}" </li>
    <li>Type: ${foundPokemonType} </li>
    </ul>`;
    searchResult.innerHTML = temp;
    searchResult.classList.add("flex", "flex-col", "justify-between");
    searchCancelBtn.classList.add("my-4");
    searchResult.appendChild(searchCancelBtn);
  });
  // -- cancel the search --
  searchCancelBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResult.textContent = "";
    searchResult.classList.add("hidden");
  });
};
