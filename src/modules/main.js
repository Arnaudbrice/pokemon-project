// You can work here or download the template
import { fetchData, populate } from "./network.js";
import {
  createPokemonCard,
  handleMouseOut,
  handleMouseOver
} from "./display.js";
import { searchPokemon } from "./searchFunction.js";
import { createCatchButton } from "./catchFunction.js";

//********** body styling **********
const BODY_STYLES = {
  backgroundColor: "#faf7f4",
  backgroundImage:
    'url("https://transparenttextures.com/patterns/asfalt-dark.png")',
  fontFamily: "Afacad Flux, Afacad, sans-serif",
  lineHeight: "1.5"
};

/**
 * Applies predefined styles to the document body
 * @function setupBodyStyles
 */
function setupBodyStyles() {
  Object.assign(document.body.style, BODY_STYLES); //copies all properties from BODY_STYLES to document.body.style
}

setupBodyStyles();

//********** app initialisation with data fetching and rendering **********
/**
 * Initializes the Pokemon application by loading data, rendering cards, and setting up search
 *
 * @returns {Promise<void>}
 */
const initializeApp = async () => {
  const pokemonData = await loadPokemonData();
  const container = getPokemonContainer();
  renderPokemonCards(pokemonData, container);
  initializeSearch(pokemonData);
};

/**
 * Loads and processes Pokemon data from the API
 *
 * @returns {Promise<Array>} Array of processed Pokemon data objects
 */
const loadPokemonData = async () => {
  const data = await fetchData();
  return await populate(data);
};

/**
 * Gets the Pokemon container element from the DOM
 * @function getPokemonContainer
 * @returns {HTMLElement} The Pokemon container DOM element
 */
const getPokemonContainer = () => {
  return document.getElementById("pokemon-container");
};

/**
 * Renders Pokemon cards to the specified container
 *
 * @param {Array} pokemonArray - Array of Pokemon data objects
 * @param {HTMLElement} container - DOM container to append cards to
 */
const renderPokemonCards = (pokemonArray, container) => {
  pokemonArray.forEach(pokemon => {
    const card = createPokemonCardWithEvents(pokemon);
    container.appendChild(card);
  });
};

/**
 * Creates a complete Pokemon card with catch button and event listeners
 *
 * @param {Object} pokemon - Pokemon data object
 * @returns {HTMLElement} Complete Pokemon card element with events attached
 */
const createPokemonCardWithEvents = pokemon => {
  const card = createPokemonCard(pokemon);
  const catchButton = createCatchButton(pokemon);

  card.appendChild(catchButton);
  addHoverEvents(card);

  return card;
};

/**
 * Adds mouse hover event listeners to an element
 *
 * @param {HTMLElement} element - DOM element to add events to
 */
const addHoverEvents = element => {
  element.addEventListener("mouseover", handleMouseOver);
  element.addEventListener("mouseout", handleMouseOut);
};

/**
 * Initializes the Pokemon search functionality
 *
 * @param {Array} pokemonData - Array of Pokemon data for searching
 */
const initializeSearch = pokemonData => {
  searchPokemon(pokemonData);
};

// Initialize the app
initializeApp();

// footer styling
/* const footer = document.createElement("footer");

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

document.body.appendChild(footer); */

// footer styling
const STYLES = {
  footer: [
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "text-center",
    "w-full",
    "h-16"
  ],
  footerText: ["text-white", "bg-[#362717]", "text-xl", "w-full", "p-4"]
};

/**
 * Creates a footer element with the provided authors and their information.
 *
 * @param {Array} authors - An array of strings representing the names of the authors.
 * @returns {HTMLElement} The footer element.
 */
function createFooter(authors) {
  const footer = createElement("footer", STYLES.footer);
  const text = `Made with ❤️ by ${authors.join(
    ", "
  )} ©${new Date().getFullYear()} All rights reserved`;
  const paragraph = createElement("p", STYLES.footerText, text);

  footer.appendChild(paragraph);
  return footer;
}

/**
 * Creates an HTML element with the specified tag, classes, and text content.
 *
 * @param {string} tag - The HTML tag to use for the element.
 * @param {Array} classes - An array of strings representing the CSS classes to apply to the element.
 * @param {string} textContent - The text content to set for the element.
 * @returns {HTMLElement} The created element.
 */
function createElement(tag, classes, textContent = "") {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  if (textContent) element.textContent = textContent;
  return element;
}

const authors = ["Arnaud", "Yan", "Marvin", "Ahmed"];

const footer = createFooter(authors);
document.body.appendChild(footer);
