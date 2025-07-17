import { createPokemonCard } from "./display.js";
// import ballIconUrl from "../img/Ball_icon.svg.png";
export function searchPokemon(allPokemon) {
  // --------------------------------------- search function ---------------------------------------------------------------------------
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchResult = document.getElementById("search-result");

  // --- creat a cancel btn for search ---
  const searchCancelBtn = document.createElement("button");
  searchCancelBtn.textContent = "cancel";
  searchCancelBtn.classList.add(
    "cancel-btn",
    "text-white",
    "border-1",
    "border-[#362717]",
    "my-2",
    "rounded-md",
    "bg-[hsl(31,40%,30%)]",
    "hover:cursor-pointer",
    "hover:bg-[hsl(31,40%,40%)]"
  );

  // --- click of search --
  searchBtn.addEventListener("click", () => {
    searchResult.innerHTML = "";
    searchResult.classList.remove("hidden");

    const searchContent = searchInput.value.trim().toLowerCase();

    // -- found the Pokemon and display --
    const foundPokemon = allPokemon.find(
      (pokemon) =>
        pokemon.data.name === searchContent ||
        pokemon.data.id.toString() === searchContent
    );

    if (!foundPokemon) {
      searchResult.textContent = "please enter a name or ID!";
      searchResult.classList.add(
        "flex",
        "flex-col",
        "text-red-400",
        "font-blod"
      );
      searchResult.appendChild(searchCancelBtn);
      return;
    }

    // ---------------- display search result ---------------
    const foundPokemonCard = createPokemonCard(foundPokemon);
    foundPokemonCard.firstChild.textContent = `ID: ${foundPokemon.data.id} | ${foundPokemon.data.name}`;

    // foundPokemonCard.firstChild.appendChild(caughtIcon);
    foundPokemonCard.firstChild.classList.add(
      "flex",
      "justify-center",
      "gap-4"
    );
    searchResult.classList.add("flex", "flex-col", "justify-between");
    searchCancelBtn.classList.add("my-4");
    searchResult.appendChild(foundPokemonCard);
    foundPokemonCard.style = "";

    searchResult.appendChild(searchCancelBtn);
  });
  // -- cancel the search --
  searchCancelBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResult.textContent = "";
    searchResult.classList.add("hidden");
  });
}
