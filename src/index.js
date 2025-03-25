document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const nameDisplay = document.getElementById("name");
  const imageDisplay = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");
  const voteForm = document.getElementById("votes-form");
  const voteInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-btn");
  const characterForm = document.getElementById("character-form");

  const baseUrl = "http://localhost:3000/characters";
  let currentCharacter = null;

  // Fetch characters and display them in the character bar
  fetch(baseUrl)
      .then(response => response.json())
      .then(characters => {
          characters.forEach(character => addCharacterToBar(character));
      });

  function addCharacterToBar(character) {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.addEventListener("click", () => displayCharacterDetails(character));
      characterBar.appendChild(span);
  }

  function displayCharacterDetails(character) {
      currentCharacter = character;
      nameDisplay.textContent = character.name;
      imageDisplay.src = character.image;
      imageDisplay.alt = character.name;
      voteCount.textContent = character.votes;
  }

  voteForm.addEventListener("submit", event => {
      event.preventDefault();
      const votesToAdd = parseInt(voteInput.value);
      if (!isNaN(votesToAdd)) {
          currentCharacter.votes += votesToAdd;
          voteCount.textContent = currentCharacter.votes;
          voteInput.value = "";
          
          // Update server with new vote count
          fetch(`${baseUrl}/${currentCharacter.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ votes: currentCharacter.votes })
          });
      }
  });

  resetButton.addEventListener("click", () => {
      if (currentCharacter) {
          currentCharacter.votes = 0;
          voteCount.textContent = 0;

          // Update server to reset votes
          fetch(`${baseUrl}/${currentCharacter.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ votes: 0 })
          });
      }
  });

  if (characterForm) {
      characterForm.addEventListener("submit", event => {
          event.preventDefault();
          const name = document.getElementById("name").value;
          const imageUrl = document.getElementById("image-url").value;
          
          if (name && imageUrl) {
              const newCharacter = { name, image: imageUrl, votes: 0 };
              
              fetch(baseUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newCharacter)
              })
              .then(response => response.json())
              .then(character => {
                  addCharacterToBar(character);
                  displayCharacterDetails(character);
              });
              
              characterForm.reset();
          }
      });
  }
});
