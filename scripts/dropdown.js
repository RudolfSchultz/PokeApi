// 1. Deine Konstante (Datenquelle)
const generations = [
  { id: 1, name: "Generation 1" },
  { id: 2, name: "Generation 2" },
  { id: 3, name: "Generation 3" },
  { id: 4, name: "Generation 4" },
  { id: 5, name: "Generation 5" },
  { id: 6, name: "Generation 6" },
  { id: 7, name: "Generation 7" },
  { id: 8, name: "Generation 8" },
  { id: 9, name: "Generation 9" }
];

// Elemente aus dem DOM holen
const selectElement = document.getElementById('gen-select');
// const imageContainer = document.getElementById('image-container');

// 2. Dropdown befüllen (Initialisierung)
function initDropdown() {
  generations.forEach(gen => {
    const option = document.createElement('option');
    option.value = gen.id; // Der Wert, der gespeichert wird (z.B. 1)
    option.textContent = gen.name; // Was der Nutzer sieht (z.B. "Generation 1")
    selectElement.appendChild(option);
  });
}

// 4. Event Listener: Was passiert beim Auswählen?
// selectElement.addEventListener('change', (event) => {
//   const selectedValue = event.target.value;
  
//   // A. Auswahl im LocalStorage speichern
//   localStorage.setItem('selectedGen', selectedValue);
// });

// // 5. Beim Starten der Seite (State wiederherstellen)
// function onPageLoad() {
//   initDropdown(); // Dropdown bauen

//   // Prüfen, ob schon mal was ausgewählt wurde
//   const savedGen = localStorage.getItem('selectedGen');

//   if (savedGen) {
//     // Wenn ja: Dropdown auf diesen Wert setzen und Bilder laden
//     selectElement.value = savedGen;
//   } else {
//     // Wenn nein: Standardwert (z.B. Gen 1) laden
//     selectElement.value = generations[0].id;
//   }
// }

// // Los geht's
// onPageLoad();