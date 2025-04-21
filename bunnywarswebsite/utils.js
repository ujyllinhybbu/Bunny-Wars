// utils.js
function displayMessage(message, x = 50, y = 50, lineHeight = 28) {
    const bgCtx = GraphicsManager.bgCtx; // Get the canvas context

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

function getPlayerInput(inputText) {
    displayMessage(inputText, 500, 300, 28); // Display the input text on the canvas
    return new Promise((resolve) => {
        const input = document.getElementById('game-input');
        const submit = document.getElementById('submit-button');

        input.style.display = 'block';
        submit.style.display = 'block';
        input.focus();

        const handler = () => {
            const value = input.value.trim();
            input.value = '';
            input.style.display = 'none';
            submit.style.display = 'none';
            submit.removeEventListener('click', handler);
            resolve(value);
        };

        submit.addEventListener('click', handler);
    });
}

function getPlayerInputWithTimeout(promptText, timeoutMs = 10000) {
    displayMessage(promptText, 500, 300, 28);

    const input = document.getElementById('game-input');
    const submit = document.getElementById('submit-button');
    const timerContainer = document.getElementById('timer-container');
    const timerProgress  = document.getElementById('timer-progress');
    const timerText      = document.getElementById('timer-text');

    // UI 표시 (이전 cleanup에서 숨기던 부분 제거) // CHANGED
    input.style.display = 'block'; // CHANGED
    submit.style.display = 'block'; // CHANGED
    timerContainer.style.display = 'flex'; // CHANGED
    input.focus(); // unchanged

    return new Promise(resolve => {
        let resolved = false;
        const totalSec = Math.ceil(timeoutMs / 1000);
        let remaining = totalSec;

        // 타이머 초기화 // unchanged
        timerText.textContent = remaining;
        timerProgress.style.width = '100%';

        // 1초마다 카운트다운 // unchanged
        const intervalId = setInterval(() => {
            remaining--;
            if (remaining >= 0) {
                timerText.textContent = remaining;
                timerProgress.style.width = (remaining / totalSec * 100) + '%';
            }
            if (remaining <= 0 && !resolved) {
                resolved = true;                
                clearInterval(intervalId); // CHANGED 위치로 이동
                input.value = ''; // CHANGED: 입력값 초기화
                resolve(null); // unchanged
            }
        }, 1000);

        // submit 이벤트 리스너 // unchanged
        submit.addEventListener('click', function onSubmit() {
            if (resolved) return;
            resolved = true;
            clearInterval(intervalId); // CHANGED: 타이머 중단
            const value = input.value.trim(); // unchanged
            input.value = ''; // CHANGED: 입력값 초기화
            resolve(value); // unchanged
        });
    });
}