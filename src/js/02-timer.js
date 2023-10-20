class CountdownTimer {
  constructor() {
    this.refs = {
      days: document.querySelector("[data-days]"),
      hours: document.querySelector("[data-hours]"),
      mins: document.querySelector("[data-minutes]"),
      secs: document.querySelector("[data-seconds]"),
    };
  }

  getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((total / 1000 / 60) % 60);
    const secs = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      mins,
      secs,
    };
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  updateColors() {
    if (this.backgroundColor != null) {
      this.refs.days.style.background = this.backgroundColor;
      this.refs.hours.style.background = this.backgroundColor;
      this.refs.mins.style.background = this.backgroundColor;
      this.refs.secs.style.background = this.backgroundColor;
    }

    if (this.foregroundColor != null) {
      this.refs.days.style.color = this.foregroundColor;
      this.refs.hours.style.color = this.foregroundColor;
      this.refs.mins.style.color = this.foregroundColor;
      this.refs.secs.style.color = this.foregroundColor;
    }
  }

  startTimer() {
    const timer = this.getTimeRemaining(this.targetDate);
    this.updateTimer(timer);
    this.updateColors();
    setInterval(() => {
      const timer = this.getTimeRemaining(this.targetDate);
      this.updateTimer(timer);
    }, 1000);
  }
}
const timer = new CountdownTimer();
timer.startTimer();
console.log(timer);
