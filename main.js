// You can work here or download the template

document.body.style.backgroundColor = "#faf7f4";
document.body.style.backgroundImage =
  'url("https://transparenttextures.com/patterns/asfalt-dark.png")';

document.body.style.fontFamily = "Afacad Flux, Afacad, sans-serif";
document.body.style.lineHeight = "1.5";

const heading = document.querySelector("h1");
heading.style.textAlign = "center";
heading.classList.add("py-12");

const fetchData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) {
      throw new Error(
        `Error fetching data from the Pokémon API with status ${response.status}`
      );
    }

    const data = await response.json();

    // https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/<id of the pokemon>.svg

    // https://pokeapi.co/api/v2/pokemon/1/   sprites object for images

    const container = document.querySelector(".container");
    container.classList.add("my-8");

    const pokemonContainer = document.getElementById("pokemon-container");

    /*   pokemonContainer.style.textAlign = "center";
    pokemonContainer.style.margin = "0 auto"; */
    pokemonContainer.classList.add("mx-auto", "my-0", "text-center");
    // pokemonContainer.style.backgroundColor = "";
    // array of pokemon object with name url
    const results = data.results;
    for (const pokemon of results) {
      const pokemonContainerItem = document.createElement("div");
      const itemHeading = document.createElement("h2");
      const itemImage = document.createElement("img");
      const itemType = document.createElement("p");

      itemHeading.textContent = pokemon.name;

      const pokemonData = await fetch(pokemon.url);
      const pokemonDataJson = await pokemonData.json();
      itemImage.setAttribute(
        "src",
        pokemonDataJson.sprites.other.dream_world.front_default
      );

      console.log(pokemonDataJson);
      // itemType.textContent = pokemonDataJson.types[0].type.name;
      itemType.textContent = `Type: ${pokemonDataJson.types
        .map(type => type.type.name)
        .join(", ")}`;

      pokemonContainerItem.appendChild(itemHeading);
      pokemonContainerItem.appendChild(itemImage);
      pokemonContainerItem.appendChild(itemType);
      pokemonContainer.appendChild(pokemonContainerItem);

      // styling
      pokemonContainerItem.classList.add("rounded-md", "p-4");

      pokemonContainerItem.addEventListener("mouseover", function(event) {
        this.style.transform = "scale(1.05)";
        this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      });
      pokemonContainerItem.addEventListener("mouseout", function(event) {
        this.style.transform = "scale(1)";
        this.style.boxShadow = "none";
      });

      pokemonContainerItem.style.backgroundColor = "#ffffff";

      itemHeading.classList.add("font-bold", "text-2xl", "mb-2");

      // itemHeading.style.marginBottom = "0.5rem";

      itemHeading.style.color = "#ffffff";
      itemHeading.style.backgroundColor = "#362717";

      itemHeading.classList.add("rounded-md");

      itemImage.style.maxWidth = "200px";
      itemImage.style.height = "200px";
      itemImage.style.display = "block";
      itemImage.style.margin = "0 auto";

      itemType.style.color = "#53412D";

      itemType.classList.add(
        "py-4",
        "mt-4",
        "border-t-4",
        "border-t-[#faf7f4]",
        "text-xl"
      );
    }
  } catch (error) {
    console.error(error);
  }
};
fetchData();

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
footerParagraph.textContent = `Made with ❤️ by Arnaud,Yan,Marvin,Ahmed ©${new Date().getFullYear()} All rights reserved`;
footerParagraph.classList.add(
  "text-white",
  "bg-[#362717]",
  "text-xl",
  "w-full",
  "p-4"
);
footer.appendChild(footerParagraph);

document.body.appendChild(footer);
