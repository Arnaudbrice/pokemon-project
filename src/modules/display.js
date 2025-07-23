/**
 * Creates a styled Pokemon card element with name, image, and type information
 * @param {Object} pokemonData - The data object containing information about the Pokémon.
 * @returns {HTMLElement} The complete Pokemon card element
 */
export function createPokemonCard(pokemonData) {
  const elements = createElements(pokemonData);
  applyStyles(elements);
  return elements.container;
}

/**
 * Creates and returns a set of HTML elements representing a Pokémon.
 *
 * @param {Object} pokemonData - The data object containing information about the Pokémon.
 *
 * @returns {Object} An object containing the created HTML elements.
 * @returns {HTMLElement} return.container - The main container element holding all other elements.
 * @returns {HTMLElement} return.heading - The heading element displaying the Pokémon's name.
 * @returns {HTMLElement} return.image - The image element displaying the Pokémon's sprite.
 * @returns {HTMLElement} return.type - The paragraph element displaying the Pokémon's types.
 */
function createElements(pokemonData) {
  const container = document.createElement("div");
  const heading = document.createElement("h2");
  const image = document.createElement("img");
  const type = document.createElement("p");

  heading.textContent = pokemonData.name;
  image.src = pokemonData.data.sprites.other.dream_world.front_default;
  type.textContent = `Type: ${pokemonData.data.types
    .map((t) => t.type.name)
    .join(", ")}`;

  container.append(heading, image, type);
  return { container, heading, image, type };
}

/**
 * Applies various CSS styles to the provided HTML elements.
 *
 * @param {Object} elements - An object containing the HTML elements to style.
 * @param {HTMLElement} elements.container - The container element to which styles are applied.
 * @param {HTMLElement} elements.heading - The heading element to which styles are applied.
 * @param {HTMLElement} elements.image - The image element to which styles are applied.
 * @param {HTMLElement} elements.type - The paragraph element displaying the Pokémon's types.
 *
 * @returns {void} This function does not return a value.
 */
function applyStyles({ container, heading, image, type }) {
  container.classList.add("rounded-md", "p-4", "bg-[#ffffff]");
  container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  heading.classList.add(
    "font-bold",
    "text-2xl",
    "mb-2",
    "text-white",
    "text-center",
    "bg-[#362717]",
    "rounded-md"
  );
  image.classList.add("max-w-[200px]", "h-[200px]", "block", "my-0", "mx-auto");
  type.classList.add(
    "text-[#53412D]",
    "py-4",
    "mt-4",
    "border-t-4",
    "border-t-[#53412D]/20",
    "text-xl"
  );
}

/**
 * Handles mouse over events by scaling up the element and enhancing its shadow
 * @param {MouseEvent} event - The mouse over event
 */
export function handleMouseOver(event) {
  this.style.transform = "scale(1.05)";
  this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
}

/**
 * Handles mouse over events by scaling down the element and enhancing its shadow
 * @param {MouseEvent} event - The mouse out event
 */
export function handleMouseOut(event) {
  this.style.transform = "scale(1)";
  this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
}
