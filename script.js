let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');
const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        startBtn.textContent = 'Start';
        timerId = null;
        return;
    }

    timeLeft = timeLeft || timeInput.value * 60;
    startBtn.textContent = 'Pause';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Start';
            alert('Time is up!');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = timeInput.value * 60;
    startBtn.textContent = 'Start';
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    modeLabel.textContent = isWorkMode ? 'Work Mode' : 'Break Mode';
    
    // Set default times for different modes
    if (isWorkMode) {
        timeInput.value = 25;
        document.body.style.background = 'linear-gradient(135deg, #f6f8fd 0%, #f0f3fa 100%)';
    } else {
        timeInput.value = 5;
        document.body.style.background = 'linear-gradient(135deg, #f0fff4 0%, #e6ffed 100%)';
    }
    
    resetTimer();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
timeInput.addEventListener('change', resetTimer);
modeToggle.addEventListener('change', toggleMode);

// Initialize the display
resetTimer(); 