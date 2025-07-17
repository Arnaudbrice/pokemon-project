// save the pokemon in localStorage
function catchPokemon(pokemon) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let existPok = favorites.some((p) => p.name === pokemon.name);
  if (!existPok) {
    favorites.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert(pokemon.name + "wurde gefangen zum Favorite");
  } else {
    alert(pokemon.name + "ist schon gefangen in Favorite");
  }
}
// fangen Button zu speichern die Pokemon zum Favoriten :
export function createCatchButton(pokemon) {
  const catchButton = document.createElement("button");
  catchButton.textContent = "CATCH";
  catchButton.classList.add(
    "m-5",
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

  //function button add to favorite (pokodex):
  catchButton.addEventListener("click", () => {
    catchPokemon(pokemon);
  });
  return catchButton;
}

export function createReleaseButton(pokemon, cardElement) {
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
