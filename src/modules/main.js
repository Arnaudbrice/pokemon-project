// You can work here or download the template
import { fetchData, populate } from "./network.js";
import {
  createPokemonCard,
  handleMouseOut,
  handleMouseOver,
} from "./display.js";
import { searchPokemon } from "./searchFunction.js";
import { createCatchButton } from "./catchFunction.js";
// body styling
document.body.style.backgroundColor = "#faf7f4";
document.body.style.backgroundImage =
  'url("https://transparenttextures.com/patterns/asfalt-dark.png")';

document.body.style.fontFamily = "Afacad Flux, Afacad, sans-serif";
document.body.style.lineHeight = "1.5";
async function main() {
  const data = await fetchData();
  const allPokemonDataArray = await populate(data);
  const pokemonContainer = document.getElementById("pokemon-container");
  console.log(allPokemonDataArray);

  allPokemonDataArray.forEach((pokemon) => {
    const pokemonContainerItem = createPokemonCard(pokemon);
    const catchButton = createCatchButton(pokemon);

    pokemonContainerItem.appendChild(catchButton);
    pokemonContainer.appendChild(pokemonContainerItem);
    pokemonContainerItem.addEventListener("mouseover", handleMouseOver);
    pokemonContainerItem.addEventListener("mouseout", handleMouseOut);
  });

  searchPokemon(allPokemonDataArray);
}
main();

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
