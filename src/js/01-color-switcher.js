const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timer = 0;

const setColorChange = function () {
  refs.body.style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled');
};
const stopColorChange = function () {
  clearInterval(timer);

  refs.btnStop.setAttribute('disabled', 'disabled');
  refs.btnStart.removeAttribute('disabled');
};

refs.btnStart.addEventListener('click', setColorChange);
refs.btnStop.addEventListener('click', stopColorChange);
