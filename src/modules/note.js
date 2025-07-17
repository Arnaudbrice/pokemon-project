//Notiz-Feature
export function createNoteButton(pokemon, cardElement) {
  const noteButton = document.createElement("button");
  noteButton.textContent = "NOTIZ";
  noteButton.classList.add(
    "m-1",
    "mx-auto",
    "block",
    "bg-yellow-600",
    "text-white",
    "font-bold",
    "py-1",
    "px-3",
    "rounded",
    "hover:bg-yellow-400",
    "transition",
    "duration-300"
  );

  // Notizfeld unter der Karte anzeigen
  const noteDisplay = document.createElement("p");
  noteDisplay.classList.add("mt-2", "text-sm", "text-gray-700");
  noteDisplay.style.whiteSpace = "pre-wrap";

  // Lade gespeicherte Notiz
  const notes = JSON.parse(localStorage.getItem("pokemonNotes")) || {};
  if (notes[pokemon.name]) {
    noteDisplay.textContent = "📝 " + notes[pokemon.name];
  }

  noteButton.addEventListener("click", () => {
    const userNote = prompt(
      `Notiz zu ${pokemon.name}:`,
      notes[pokemon.name] || ""
    );
    if (userNote !== null) {
      notes[pokemon.name] = userNote.trim();
      localStorage.setItem("pokemonNotes", JSON.stringify(notes));
      noteDisplay.textContent = "📝 " + userNote.trim();
    }
  });

  cardElement.insertBefore(noteButton, cardElement.firstChild);
  cardElement.insertBefore(noteDisplay, cardElement.children[1]);
}
