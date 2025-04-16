// utils.js
function displayMessage(message, bgName = null, x = 50, y = 50, lineHeight = 28) {
    const bgCtx = GraphicsManager.bgCtx; // Get the canvas context

    if (bgName){
        GraphicsManager.drawBackground(bgName); // Draw the background if specified
    }
    bgCtx.fillStyle = 'white'; // Set text color
    bgCtx.font = '20px Courier New'; // Set font style and size
    bgCtx.strokeStyle = 'black'; // Set stroke color
    bgCtx.lineWidth = 4; // Set stroke width

    // Split the message into lines if it contains line breaks
    const lines = message.split('\n');
    lines.forEach((line, index) => {
        const yPosition = y + index * lineHeight; // Calculate the y position for each line
        bgCtx.strokeText(line, x, yPosition); // Draw the text with stroke
        bgCtx.fillText(line, x, yPosition); // Draw the text with fill
    });
}

function getPlayerInput() {
    return new Promise((resolve) => {
        const gameInput = document.getElementById('game-input');
        const submitButton = document.getElementById('submit-button');

        gameInput.focus(); // Focus the input field*/

        const handleSubmit = () => {
            const input = gameInput.value.trim();
            gameInput.value = ''; // Clear the input field
            resolve(input); // Resolve the promise with the input
            submitButton.removeEventListener('click', handleSubmit); // Clean up the event listener
        };

        submitButton.addEventListener('click', handleSubmit);
    });
}
