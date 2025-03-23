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
