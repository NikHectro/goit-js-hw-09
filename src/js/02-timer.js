import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]");

startBtn.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          window.alert("Please choose a date in the future");
          startBtn.setAttribute("disabled", true);
      } else {
          startBtn.removeAttribute("disabled");
      }
      
      
  },
};

flatpickr(dateInput, options);