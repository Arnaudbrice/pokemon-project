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
/*// ---------------- display Pokemon---------------
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
console.log(favorites);
favorites.forEach((pokemon) => {
  fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow";
      card.innerHTML = `
  <img src="${data.sprites.front_default}" alt="${data.name}" class="mx-auto" />
  <h2 class="text-center mt-2">${data.name}</h2>
`;
      document.getElementById("pokedexGrid").appendChild(card);
    });
});*/

/*---display Pokemon V2 ----
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
favorites.forEach((pokemon) => {
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded shadow";
  card.innerHTML = ` <img src="${pokemon.image}" alt="${
    pokemon.name
  }" class="mx-auto" /> <h2 class="text-center mt-2">${
    pokemon.name
  }</h2> <p class="text-center">${pokemon.types.join(", ")}</p> `;
  document.getElementById("pokedexGrid").appendChild(card);
});*/
//Release Button
function createReleaseButton(pokemon, cardElement) {
  const releaseButton = document.createElement("button");
  releaseButton.textContent = "RELEASE";
  releaseButton.classList.add(
    "m-5",
    "mx-auto",
    "block",
    "bg-red-800",
    "text-white",
    "font-bold",
    "py-2",
    "px-5",
    "rounded",
    "hover:bg-red-400",
    "transition",
    "duration-300"
  );

  releaseButton.addEventListener("click", () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((p) => p.name !== pokemon.name);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Element aus dem DOM entfernen
    cardElement.remove();

    alert(`${pokemon.name} wurde aus den Favoriten entfernt.`);
  });

  return releaseButton;
}
//Notiz-Feature
function createNoteButton(pokemon, cardElement) {
  const noteButton = document.createElement("button");
  noteButton.textContent = "NOTIZ";
  noteButton.classList.add(
    "m-1",
    "mx-auto",
    "block",
    "bg-yellow-600",
    "text-white",
    "font-bold",
    "py-1",
    "px-3",
    "rounded",
    "hover:bg-yellow-400",
    "transition",
    "duration-300"
  );

  // Notizfeld unter der Karte anzeigen
  const noteDisplay = document.createElement("p");
  noteDisplay.classList.add("mt-2", "text-sm", "text-gray-700");
  noteDisplay.style.whiteSpace = "pre-wrap";

  // Lade gespeicherte Notiz
  const notes = JSON.parse(localStorage.getItem("pokemonNotes")) || {};
  if (notes[pokemon.name]) {
    noteDisplay.textContent = "📝 " + notes[pokemon.name];
  }

  noteButton.addEventListener("click", () => {
    const userNote = prompt(
      `Notiz zu ${pokemon.name}:`,
      notes[pokemon.name] || ""
    );
    if (userNote !== null) {
      notes[pokemon.name] = userNote.trim();
      localStorage.setItem("pokemonNotes", JSON.stringify(notes));
      noteDisplay.textContent = "📝 " + userNote.trim();
    }
  });

  cardElement.appendChild(noteButton);
  cardElement.appendChild(noteDisplay);
}
// --- display Pokémon V3 ---------------
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const grid = document.getElementById("pokedexGrid");

favorites.forEach((pokemon) => {
  // ► Karte
  const card = document.createElement("div");
  card.className =
    "rounded-md p-4 bg-white transition duration-200 " +
    "shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.5)] " +
    "hover:scale-105";

  // ► Name-Balken
  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  name.className =
    "font-bold text-2xl mb-2 text-white bg-[#362717] rounded-md text-center";

  // ► Bild
  const img = document.createElement("img");
  img.src = pokemon.image;
  img.alt = pokemon.name;
  img.className = "max-w-[200px] h-[200px] block my-0 mx-auto";

  // ► Typenzeile
  const types = document.createElement("p");
  types.textContent = `Type: ${pokemon.types.join(", ")}`;
  types.className =
    "text-[#53412D] py-4 mt-4 border-t-4 border-t-[#53412D]/20 text-xl text-center";

  // ► Karte zusammenbauen

  const releaseButton = createReleaseButton(pokemon, card); //Release Button
  createNoteButton(pokemon, card);
  card.append(name, img, types, releaseButton);
  grid.appendChild(card);
});
// footer styling
const footer = document.createElement("footer");

footer.classList.add(
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "text-center",
  "w-full",
  "h-16"
);

const footerParagraph = document.createElement("p");
footerParagraph.textContent = `Made with ❤️ by Arnaud,Yan, Marvin, Ahmed ©${new Date().getFullYear()} All rights reserved`;
footerParagraph.classList.add(
  "text-white",
  "bg-[#362717]",
  "text-xl",
  "w-full",
  "p-4"
);
footer.appendChild(footerParagraph);

document.body.appendChild(footer);
