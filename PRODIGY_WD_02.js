let startTime;
let updatedTime;
let difference;
let interval;
let isPaused = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
  if (!isPaused) {
    startTime = new Date().getTime();
  } else {
    startTime = new Date().getTime() - difference;
    isPaused = false;
  }

  interval = setInterval(() => {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 2)}`;
  }, 10);
}

function pauseTimer() {
  clearInterval(interval);
  isPaused = true;
}

function resetTimer() {
  clearInterval(interval);
  display.innerHTML = '00:00:00';
  difference = 0;
  isPaused = false;
  lapCounter = 1;
  lapsContainer.innerHTML = '';
}

function recordLap() {
  if (difference) {
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const lapTime = `${lapCounter}. ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsContainer.appendChild(li);
    lapCounter++;
  }
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}
