// utils.js
function displayMessage(message) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML += `<div>${message}</div>`;
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

function getPlayerInput(message) {
    return new Promise((resolve) => {
        const gameInput = document.getElementById('game-input');
        const submitButton = document.getElementById('submit-button');

         displayMessage(message); // Show the prompt message
        gameInput.focus(); // Focus the input field

        const handleSubmit = () => {
            const input = gameInput.value.trim();
            gameInput.value = ''; // Clear the input field
            resolve(input); // Resolve the promise with the input
            submitButton.removeEventListener('click', handleSubmit); // Clean up the event listener
        };

        submitButton.addEventListener('click', handleSubmit);
    });
}