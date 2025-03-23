document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");

    // Fetch characters from API
    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.classList.add("character");
                span.dataset.id = character.id;
                characterBar.appendChild(span);
            });
        })
        .catch(error => console.error("Error fetching characters:", error));
});

const detailedInfo = document.getElementById("detailed-info");
const characterName = detailedInfo.querySelector("h2");
const characterImage = detailedInfo.querySelector("img");
const characterVotes = detailedInfo.querySelector("#vote-count");

document.getElementById("character-bar").addEventListener("click", (event) => {
    if (event.target.classList.contains("character")) {
        const characterId = event.target.dataset.id;
        
        fetch(`http://localhost:3000/characters/${characterId}`)
            .then(response => response.json())
            .then(character => {
                characterName.textContent = character.name;
                characterImage.src = character.image;
                characterVotes.textContent = character.votes;
                characterImage.alt = character.name;
            })
            .catch(error => console.error("Error fetching character details:", error));
    }
});

const voteForm = document.getElementById("votes-form");

voteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes");
    const newVotes = parseInt(votesInput.value);
    
    if (!isNaN(newVotes)) {
        const totalVotes = parseInt(characterVotes.textContent) + newVotes;
        characterVotes.textContent = totalVotes;
        votesInput.value = "";
    }
});
