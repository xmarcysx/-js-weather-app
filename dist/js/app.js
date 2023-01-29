const inputValue = document.querySelector('.location');
const checkBtn = document.querySelector('.check');
const popup = document.querySelector('.popup');
const thousandSunny = document.querySelector('.thousand-sunny');

let weather = {
  apiKey: '64e3084597b676e01acdf23316091f47',
  fetchWeather(city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert('No weather found.');
          throw new Error('No weather found.');
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    thousandSunny.style.filter = 'blur(5px)';
    popup.classList.add('popupactive');
    const createPopup = `
  <div class="X"> 
    <i class="fa-solid fa-x"></i>
  </div>

  <div class="info">
    <h2 class="city">${name}</h2>
    <h1 class="temp">${Math.round(temp)}</h1>
    <div class="flex">
      <img src="${
        'https://openweathermap.org/img/wn/' + icon + '.png'
      }" alt="" class="icon" />
      <div class="description">${description}</div>
    </div>
  </div> 
    `;

    popup.innerHTML = createPopup;

    const X = document.querySelector('.X');
    X.addEventListener('click', () => {
      thousandSunny.style.filter = 'blur(0px)';
      popup.classList.remove('popupactive');
      popup.innerHTML = '';
    });
  },
  search() {
    this.fetchWeather(inputValue.value);
  },
};

checkBtn.addEventListener('click', function (event) {
  event.preventDefault();
  weather.search();
});
