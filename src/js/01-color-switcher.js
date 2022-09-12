const toStart = document.querySelector('[data-start]');
const toStop = document.querySelector('[data-stop]');
const cleaner = document.querySelector('[data-cleaner]');

toStart.addEventListener('click', onStart);
toStop.addEventListener('click', onStop);
cleaner.addEventListener('click', toClean);
//

let interval;

//

function onStart(event) {
  toStart.disabled = true;
  toStop.disabled = false;

  interval = setInterval(switcher, 1000);
}

function onStop(event) {
  toStart.disabled = false;
  toStop.disabled = true;
  cleaner.disabled = false;

  clearInterval(interval);
}

function toClean() {
  cleaner.disabled = true;
  document.body.style.backgroundColor = '#ffffff';
}

function switcher() {
  document.body.style.backgroundColor = getRandomHexColor();
}

//

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
