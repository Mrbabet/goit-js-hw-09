import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

class CountdownTimer {
  constructor() {
    this.selectedDate = null;
    this.intervalId = null;

    this.refs = {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
      startBtn: document.querySelector('[data-start]'),
    };

    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: selectedDates => {
        this.selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (this.selectedDate <= currentDate) {
          Notiflix.Notify.failure(
            'Please choose a date and time in the future'
          );
          this.selectedDate = null;
        } else {
          Notiflix.Notify.success('Valid date');
        }
      },
    };
  }

  updateTimer() {
    // Tworzymy zmienną z aktualną datą
    const currentDate = new Date();
    // Tworzymy zmienną z różnicą pomiędzy wybraną datą a aktualną datą
    const timeDifference = this.selectedDate - currentDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Obliczamy pozotałe wartości czasu
    const days = Math.floor(timeDifference / day);
    const hours = Math.floor((timeDifference / hour) % 24);
    const minutes = Math.floor((timeDifference / minute) % 60);
    const seconds = Math.floor((timeDifference / second) % 60);
    // Aktualizujemy display timera
    this.updateDisplay(days, hours, minutes, seconds);
  }

  updateDisplay(days, hours, minutes, seconds) {
    this.refs.days.textContent = this.addLeadingZero(days);
    this.refs.hours.textContent = this.addLeadingZero(hours);
    this.refs.minutes.textContent = this.addLeadingZero(minutes);
    this.refs.seconds.textContent = this.addLeadingZero(seconds);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  startTimer() {
    // Jeżeli nie wybierzemy wartości i naciśniemy start nic zwracamy funkcję i wyświatlamy błąd
    if (!this.selectedDate) {
      Notiflix.Notify.failure('Please select a valid date and time first.');
      return;
    }
    // W przeciwnym wypadku aktualizujemy timer i aktualizujemy go co sekundę
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }
}

const timer = new CountdownTimer();
timer.refs.startBtn.addEventListener('click', () => timer.startTimer());
flatpickr('#datetime-picker', timer.options);
