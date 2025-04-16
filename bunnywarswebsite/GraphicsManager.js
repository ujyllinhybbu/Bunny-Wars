// Setup canvas
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

// Store all images/sprites
const sprites = {};

function loadSprite(name, path) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;

        img.onload = () => {
            console.log(`✅ Sprite "${name}" loaded.`);
            sprites[name] = img;
            resolve(); // 로드 완료 시 Promise 해결
        };

        img.onerror = () => {
            console.error(`❌ Failed to load sprite from "${path}"`);
            reject(new Error(`Failed to load sprite: ${path}`)); // 로드 실패 시 Promise 거부
        };
    });
}

function drawSprite(name, x, y, width, height) {
    const sprite = sprites[name];

    if (!sprite) {
        console.warn(`⚠️ Sprite "${name}" not found.`);
        return;
    }

    if (sprite.complete) {
        console.log(`Drawing sprite "${name}" at (${x}, ${y})`);
        bgCtx.drawImage(sprite, x, y, width, height);
    } 
    else {
        console.log(`⏳ Sprite "${name}" not yet complete, waiting...`);
        sprite.onload = () => {
            bgCtx.drawImage(sprite, x, y, width, height);
        };
    }
}

function drawBackground(name){
    const sprite = sprites[name];
    if (!sprite) {
        console.warn(`⚠️ Background "${name}" not found.`);
        return;
    }

    if (sprite.complete) {
        console.log(`Drawing background "${name}"`);
        bgCtx.drawImage(sprite, 0, 0, bgCanvas.width, bgCanvas.height);
    } 
    else {
        console.log(`⏳ Background "${name}" not yet complete, waiting...`);
        sprite.onload = () => {
            ctx.drawImage(sprite, 0, 0, bgCanvas.width, bgCanvas.height);
        };
    }
}

function typeMessage(message, bgName = null, x = 50, y = 50, lineHeight = 28, typingSpeed = 10) {

    if (bgName) {
        GraphicsManager.drawBackground(bgName); // Draw the background if specified
    }

    bgCtx.fillStyle = 'white'; // Set text color
    bgCtx.font = '20px Courier New'; // Set font style and size
    bgCtx.strokeStyle = 'black'; // Set stroke color
    bgCtx.lineWidth = 2; // Set stroke width
    bgCtx.fillStyle = "rgb(255, 255, 255)";
    bgCtx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Set shadow color
    bgCtx.shadowBlur = 2;
    bgCtx.shadowOffsetX = 2;
    bgCtx.shadowOffsetY = 2;

    const lines = message.split('\n'); // Split the message into lines
    let currentLine = 0;
    let currentChar = 0;

    return new Promise((resolve) => {
        function typeNext() {
            if (currentLine >= lines.length) {
                resolve(); // Resolve the promise when all lines are typed
                return;
            }

            const line = lines[currentLine];
            const partial = line.substring(0, currentChar + 1); // Get the current portion of the line
            const yPosition = y + currentLine * lineHeight; // Calculate the y position for the current line

            bgCtx.strokeText(partial, x, yPosition); // Draw the text with stroke
            bgCtx.fillText(partial, x, yPosition); // Draw the text with fill

            currentChar++;

            if (currentChar < line.length) {
                setTimeout(typeNext, typingSpeed); // Continue typing the current line
            } else {
                currentLine++;
                currentChar = 0;
                setTimeout(typeNext, typingSpeed); // Move to the next line
            }
        }
         // Handle Enter key press
         function handleKeyPress(event) {
            if (event.key === 'Enter') {
                currentLine = lines.length; // Skip to the end
                displayMessage(message); // Display the full message
                console.log("Message skipped by user.");
                window.removeEventListener('keydown', handleKeyPress); // Remove the event listener
                resolve(); // Resolve the promise immediately
            }
        }
        window.addEventListener('keydown', handleKeyPress); // Add the event listener
        typeNext(); // Start typing the message
    });
}

function clearCanvas() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height); // 캔버스 전체 지우기
}

window.GraphicsManager = {
    bgCtx,
    bgCanvas,
    loadSprite,
    drawSprite,
    clearCanvas,
    drawBackground,
    typeMessage,
};
