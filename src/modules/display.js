// create basis card with name, picture and types
export function createPokemonCard(pokemonData) {
  const pokemonContainerItem = document.createElement("div");
  const itemHeading = document.createElement("h2");
  const itemImage = document.createElement("img");
  const itemType = document.createElement("p");

  itemHeading.textContent = pokemonData.name;
  itemImage.src = pokemonData.data.sprites.other.dream_world.front_default;

  itemType.textContent = `Type: ${pokemonData.data.types
    .map((type) => type.type.name)
    .join(", ")}`;
  pokemonContainerItem.append(itemHeading, itemImage, itemType);
  // container item styling
  pokemonContainerItem.classList.add("rounded-md", "p-4", "bg-[#ffffff]");
  pokemonContainerItem.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  // container item heading h2 styling
  itemHeading.classList.add(
    "font-bold",
    "text-2xl",
    "mb-2",
    "text-white",
    "text-center",
    "bg-[#362717]",
    "rounded-md"
  );

  // container item image styling
  itemImage.classList.add(
    "max-w-[200px]",
    "h-[200px]",
    "block",
    "my-0",
    "mx-auto"
  );

  // container item type styling
  itemType.classList.add(
    "text-[#53412D]",
    "py-4",
    "mt-4",
    "border-t-4",
    "border-t-[#53412D]/20", //border top with opacity 0.2
    "text-xl"
  );
  return pokemonContainerItem;
}

export function handleMouseOver(event) {
  this.style.transform = "scale(1.05)";
  this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
}
export function handleMouseOut(event) {
  this.style.transform = "scale(1)";
  this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
}
