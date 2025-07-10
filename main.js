// You can work here or download the template

// body styling
document.body.style.backgroundColor = "#faf7f4";
document.body.style.backgroundImage =
  'url("https://transparenttextures.com/patterns/asfalt-dark.png")';

document.body.style.fontFamily = "Afacad Flux, Afacad, sans-serif";
document.body.style.lineHeight = "1.5";

// heading styling
const heading = document.querySelector("h1");
heading.style.textAlign = "center";
heading.classList.add("py-12");

/**
 * Fetch data from the Pokémon API(https://pokeapi.co/api/v2/pokemon)
 * and populate the DOM with the data
 * @returns {Promise<void>} Promise that resolves when the data is fetched and populated in the DOM
 * and rejects if there is an error fetching the data
 *
 */
const fetchData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) {
      throw new Error(
        `Error fetching data from the Pokémon API with status ${response.status}`,
      );
    }

    const data = await response.json();

    populate(data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

const populate = async (data) => {
  const container = document.querySelector(".container");
  container.classList.add("my-8");

  const pokemonContainer = document.getElementById("pokemon-container");

  /*   pokemonContainer.style.textAlign = "center";
    pokemonContainer.style.margin = "0 auto"; */
  pokemonContainer.classList.add("mx-auto", "my-0", "text-center");
  // pokemonContainer.style.backgroundColor = "";
  // array of pokemon object with name url
  const results = data.results;

  //arrays of pokemon objects with name property and url property for fetching information about this pokemon
  console.log("results", results);
  // map the results array of objects with properties(name and url) to array of promises
  // note: inside an async function,when you return a value, it automatically gets wrapped in a promise
  const pokemonDataPromises = results.map(async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(
          `Error fetching data from the Pokémon with the name ${pokemon.name}`,
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
  const notNullPokemonDataArray = pokemonDataArray.filter(
    (pokemonData) => pokemonData !== null,
  );

  for (const pokemonDataJson of notNullPokemonDataArray) {
    // Note: pokemonDataJson is an object with properties name (name of the pokemon) and data (the fetched data from this pokemon)
    // console.log("pokemonDataJson", pokemonDataJson);
   // fangen btn
  


    const pokemonContainerItem = document.createElement("div");
    const itemHeading = document.createElement("h2");
    const itemImage = document.createElement("img");
    const itemType = document.createElement("p");
   

  
 

    itemHeading.textContent = pokemonDataJson.name;

    itemImage.setAttribute(
      "src",
      pokemonDataJson.data.sprites.other.dream_world.front_default,
    );

    itemType.textContent = `Type: ${pokemonDataJson.data.types
      .map((type) => type.type.name)
      .join(", ")}`;

// fangen Button zu speichern die Pokemon zum Favoriten :
      const catchButton = document.createElement("button");
      catchButton.textContent = "Catch";
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
       "duration-300",
      );
    
  //function button Fangen :
      function catchPokemon (pokemon){
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        let existPok = favorites.some(p => p.name === pokemon.name);
        if (!existPok){
          favorites.push(pokemon);
          localStorage.setItem("favorites" , JSON.stringify(favorites));
            
          alert(pokemon.name + 'wurde gefangen zum Favorite');
      
        }
        else{
          alert(pokemon.name + 'ist schon gefangen in Favorite');
        }
     
      }
      catchButton.addEventListener("click", () => {
        const pokemon ={
          name: pokemonDataJson.name,
          image:  pokemonDataJson.data.sprites.other.dream_world.front_default,
          types: pokemonDataJson.data.types.map((type) => type.type.name)
        };
        catchPokemon(pokemon);
      });



      
     


    

    pokemonContainerItem.appendChild(itemHeading);
    pokemonContainerItem.appendChild(itemImage);
    pokemonContainerItem.appendChild(itemType);
    pokemonContainerItem.appendChild(catchButton);
    pokemonContainer.appendChild(pokemonContainerItem);
   
    // container item styling
    pokemonContainerItem.classList.add("rounded-md", "p-4", "bg-[#ffffff]");
    pokemonContainerItem.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    // pokemon container card hover effect
    pokemonContainerItem.addEventListener("mouseover", function (event) {
      this.style.transform = "scale(1.05)";
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    });
    pokemonContainerItem.addEventListener("mouseout", function (event) {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });
     


    // container item heading h2 styling
    itemHeading.classList.add(
      "font-bold",
      "text-2xl",
      "mb-2",
      "text-white",
      "bg-[#362717]",
      "rounded-md",
    );

    // container item image styling
    itemImage.classList.add(
      "max-w-[200px]",
      "h-[200px]",
      "block",
      "my-0",
      "mx-auto",
    );

    // container item type styling
    itemType.classList.add(
      "text-[#53412D]",
      "py-4",
      "mt-4",
      "border-t-4",
      "border-t-[#53412D]/20", //border top with opacity 0.2
      "text-xl",
    );
  }
};

// footer styling
const footer = document.createElement("footer");

footer.classList.add(
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "text-center",
  "w-full",
  "h-16",
);

const footerParagraph = document.createElement("p");
footerParagraph.textContent = `Made with ❤️ by Arnaud,Yan, Marvin, Ahmed ©${new Date().getFullYear()} All rights reserved`;
footerParagraph.classList.add(
  "text-white",
  "bg-[#362717]",
  "text-xl",
  "w-full",
  "p-4",
);
footer.appendChild(footerParagraph);

document.body.appendChild(footer);
