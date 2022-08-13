import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

let timerId = null;
let targetDate;
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', true);
const timeOut = document.createElement("h1");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
        Notiflix.Notify.success(`Let's start!`)
        startBtn.removeAttribute('disabled');
        startBtn.addEventListener('click', onStartBtnClick);
      //   msLeft = selectedDates[0] - new Date();
      targetDate = selectedDates[0];
    }
  },
};

flatpickr(dateInput, options);


function onStartBtnClick() {
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {
        dateInput.before(timeOut);
        const timeLeft = targetDate - new Date();
        if (timeLeft < 1000) {
            Notiflix.Notify.info('Time is out');
            clearInterval(timerId);
        }
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        onUpdateTimerData({ days, hours, minutes, seconds })
    }, 1000)
}

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

function onUpdateTimerData({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.min.textContent = addLeadingZero(minutes);
  refs.sec.textContent = addLeadingZero(seconds);
  
    timeOut.textContent = `${refs.days.textContent}:${refs.hours.textContent}:${refs.min.textContent}:${refs.sec.textContent}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}