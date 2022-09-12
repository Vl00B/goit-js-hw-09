import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const initiator = document.querySelector('[data-start]');
const indicator = {
  d: document.querySelector('[data-days]'),
  h: document.querySelector('[data-hours]'),
  m: document.querySelector('[data-minutes]'),
  s: document.querySelector('[data-seconds]'),
};

initiator.disabled = true;

let intervalID = null;

//

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const date = selectedDates[0].getTime();

    if (date < Date.now()) {
      Notiflix.Notify.failure('Choose time in future!');
      return;
    } else {
      initiator.disabled = false;

      console.log(convertMs(date));

      initiator.addEventListener('click', () => {
        const now = Date.now();
        let delta = date - now;
        intervalID = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(delta);
          indicator.d.textContent = pad(days);
          indicator.h.textContent = pad(hours);
          indicator.m.textContent = pad(minutes);
          indicator.s.textContent = pad(seconds);
          console.log('tick');
          delta -= 1000;
          if (delta < 1000) {
            initiator.disabled = true;
            clearInterval(intervalID);
            indicator.s.textContent = '00';
          }
        }, 1000);

        initiator.disabled = true;
      });
    }
  },
};

//

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

//

flatpickr(date, options);
