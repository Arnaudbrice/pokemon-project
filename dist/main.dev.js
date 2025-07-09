"use strict";

// You can work here or download the template
// body styling
document.body.style.backgroundColor = "#faf7f4";
document.body.style.backgroundImage = 'url("https://transparenttextures.com/patterns/asfalt-dark.png")';
document.body.style.fontFamily = "Afacad Flux, Afacad, sans-serif";
document.body.style.lineHeight = "1.5"; // heading styling

var heading = document.querySelector("h1");
heading.style.textAlign = "center";
heading.classList.add("py-12");
/**
 * Fetch data from the Pokémon API(https://pokeapi.co/api/v2/pokemon)
 * and populate the DOM with the data
 * @returns {Promise<void>} Promise that resolves when the data is fetched and populated in the DOM
 * and rejects if there is an error fetching the data
 *
 */

var fetchData = function fetchData() {
  var response, data;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://pokeapi.co/api/v2/pokemon?limit=50"));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("Error fetching data from the Pok\xE9mon API with status ".concat(response.status));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          populate(data);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

fetchData();

var populate = function populate(data) {
  var container, pokemonContainer, results, pokemonDataPromises, pokemonDataArray, notNullPokemonDataArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pokemonDataJson, pokemonContainerItem, itemHeading, itemImage, itemType;

  return regeneratorRuntime.async(function populate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          container = document.querySelector(".container");
          container.classList.add("my-8");
          pokemonContainer = document.getElementById("pokemon-container");
          /*   pokemonContainer.style.textAlign = "center";
            pokemonContainer.style.margin = "0 auto"; */

          pokemonContainer.classList.add("mx-auto", "my-0", "text-center"); // pokemonContainer.style.backgroundColor = "";
          // array of pokemon object with name url

          results = data.results; //arrays of pokemon objects with name property and url property for fetching information about this pokemon

          console.log("results", results); // map the results array of objects with properties(name and url) to array of promises
          // note: inside an async function,when you return a value, it automatically gets wrapped in a promise

          pokemonDataPromises = results.map(function _callee(pokemon) {
            var response, _data;

            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(fetch(pokemon.url));

                  case 3:
                    response = _context2.sent;

                    if (response.ok) {
                      _context2.next = 6;
                      break;
                    }

                    throw new Error("Error fetching data from the Pok\xE9mon with the name ".concat(pokemon.name));

                  case 6:
                    _context2.next = 8;
                    return regeneratorRuntime.awrap(response.json());

                  case 8:
                    _data = _context2.sent;
                    return _context2.abrupt("return", {
                      name: pokemon.name,
                      data: _data
                    });

                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](0);
                    console.error(_context2.t0);
                    return _context2.abrupt("return", null);

                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[0, 12]]);
          }); // console.log("pokemonDataPromises", pokemonDataPromises);
          //  Promise.all() waits for ALL promises in the array to resolve, then returns an array with all resolved objects{name,data}

          _context3.next = 9;
          return regeneratorRuntime.awrap(Promise.all(pokemonDataPromises));

        case 9:
          pokemonDataArray = _context3.sent;
          // filter out null pokemons inside the array
          notNullPokemonDataArray = pokemonDataArray.filter(function (pokemonData) {
            return pokemonData !== null;
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 14;

          for (_iterator = notNullPokemonDataArray[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            pokemonDataJson = _step.value;
            // Note: pokemonDataJson is an object with properties name (name of the pokemon) and data (the fetched data from this pokemon)
            // console.log("pokemonDataJson", pokemonDataJson);
            pokemonContainerItem = document.createElement("div");
            itemHeading = document.createElement("h2");
            itemImage = document.createElement("img");
            itemType = document.createElement("p");
            itemHeading.textContent = pokemonDataJson.name;
            itemImage.setAttribute("src", pokemonDataJson.data.sprites.other.dream_world.front_default);
            itemType.textContent = "Type: ".concat(pokemonDataJson.data.types.map(function (type) {
              return type.type.name;
            }).join(", "));
            pokemonContainerItem.appendChild(itemHeading);
            pokemonContainerItem.appendChild(itemImage);
            pokemonContainerItem.appendChild(itemType);
            pokemonContainer.appendChild(pokemonContainerItem); // container item styling

            pokemonContainerItem.classList.add("rounded-md", "p-4");
            pokemonContainerItem.addEventListener("mouseover", function (event) {
              this.style.transform = "scale(1.05)";
              this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            });
            pokemonContainerItem.addEventListener("mouseout", function (event) {
              this.style.transform = "scale(1)";
              this.style.boxShadow = "none";
            });
            pokemonContainerItem.style.backgroundColor = "#ffffff"; // container item heading h2 styling

            itemHeading.classList.add("font-bold", "text-2xl", "mb-2", "text-white", "bg-[#362717]", "rounded-md"); // container item image styling

            itemImage.classList.add("max-w-[200px]", "h-[200px]", "block", "my-0", "mx-auto"); // container item type styling

            itemType.classList.add("text-[#53412D]", "py-4", "mt-4", "border-t-4", "border-t-[#faf7f4]", "text-xl");
          }

          _context3.next = 22;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](14);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 22:
          _context3.prev = 22;
          _context3.prev = 23;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 25:
          _context3.prev = 25;

          if (!_didIteratorError) {
            _context3.next = 28;
            break;
          }

          throw _iteratorError;

        case 28:
          return _context3.finish(25);

        case 29:
          return _context3.finish(22);

        case 30:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[14, 18, 22, 30], [23,, 25, 29]]);
}; // footer styling


var footer = document.createElement("footer");
footer.classList.add("flex", "flex-col", "justify-center", "items-center", "text-center", "w-full", "h-16");
var footerParagraph = document.createElement("p");
footerParagraph.textContent = "Made with \u2764\uFE0F by Arnaud,Yan, Marvin, Ahmed \xA9".concat(new Date().getFullYear(), " All rights reserved");
footerParagraph.classList.add("text-white", "bg-[#362717]", "text-xl", "w-full", "p-4");
footer.appendChild(footerParagraph);
document.body.appendChild(footer);