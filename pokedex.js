const caughtPokemon = JSON.parse(localStorage.getItem("caughtPokemon")) || [];
console.log(caughtPokemon);
caughtPokemon.forEach((pokemon) => {
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
});
