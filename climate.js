'use strict';
const sidebarClimate = document.querySelector('.sidebar__climate');
let allCountries = JSON.parse(localStorage.getItem('allCountries'));
let container = document.querySelector('.container');
let searchClimate = document.querySelector('.search__climate');
let currentCountry = JSON.parse(localStorage.getItem('currentCountry'));

let countries = '';
let unix = 1623985628;
let capital = '';
const getTime = function (time) {
  const date = new Date(time * 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const curDate = date.getDate();
  const curMonth = date.getMonth();
  return `${curDate}/${curMonth} ${hour}:${minute}`;
};

const renderClimate = function (country) {
  country.forEach(country => {
    country.addEventListener('click', function (e) {
      let closest = e.target.closest('.countries');
      let c = closest.children[1].textContent;
      allCountries.forEach(coun => {
        let html = '';
        if (c === coun.name) {
          localStorage.setItem('capital', JSON.stringify(coun.capital));
          container.innerHTML = '';
          console.log('coming');
          fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${coun.capital}&appid=864552384699a2784c3c066abeedb4ca`
          )
            .then(res => {
              if (!res.ok) {
                throw Error('sorry cannot fetch this data iam a small coder!');
              }
              return res.json();
            })
            .then(data => {
              html = `<div class="inner">
          <div class="weather">
            <h4 class="weather__row heading">Weather ${c} <span>☁</span></h4>
            <img
              src="http://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@2x.png"
              alt=""
              class="weather__row icon"
            />
            <p class="weather__row">${data.weather[0].description}</p>
          </div>
          <div class="sun">
            <h4 class="sun__row sun__heading">SUN STATS <span>☀</span></h4>
            <p class="sun__row">
              <span class="sun__value">sunrise 🌄:</span> ${getTime(
                data.sys.sunrise
              )}
            </p>
            <p class="sun__row">
              <span class="sun__value">sunset 🌇:</span>  ${getTime(
                data.sys.sunset
              )}
            </p>
          </div>
        </div>
        <div class="climate">
          <h4 class="climate__heading">Climate ☁</h4>
          <p class="climate__row">
            <span class="climate__value">Average Temperature: </span> ${
              data.main.temp
            }K
          </p>
          <p class="climate__row">
            <span class="climate__value">Maximum Temperature:</span> ${
              data.main.temp_max
            }K
          </p>
          <p class="climate__row">
            <span class="climate__value">Minimum Temperature : </span> ${
              data.main.temp_min
            }K
          </p>
          <p class="climate__row">
            <span class="climate__value">Pressure : </span>${
              data.main.pressure
            } pascal
          </p>
          <p class="climate__row">
            <span class="climate__value">Humidty :</span>${
              data.main.humidity
            }unit
          </p>
        </div>
        <div class="wind">
          <h4 class="wind__heading">WIND 💨</h4>
          <p class="wind__row"><span class="wind__value">speed : </span> ${
            data.wind.speed
          }</p>
          <p class="wind__row"><span class="wind__value">degree : </span> ${
            data.wind.deg
          }°</p>
          <p class="wind__row">
            <span class="wind__value">Visibilty : </span> ${data.visibility}
          </p>
          <a href="next5days.html" class="wind__row next">next 5 day stats</a>
        </div>`;
              container.insertAdjacentHTML('afterbegin', html);
            })
            .catch(err => renderError(err.message, container));
        }
      });
    });
  });
};

const renderCountry = function (all) {
  sidebarClimate.innerHTML = '';
  all.forEach(country => {
    const html = ` <div class="countries">
      <img src="${country.flags.svg}" class="flag" alt="" />
      <p class="country__name">${country.name}</p>
    </div>`;

    sidebarClimate.insertAdjacentHTML('beforeend', html);
  });
  let countries = document.querySelectorAll('.countries');
  renderClimate(countries);
};
renderCountry(allCountries);

const renderError = function (message, el) {
  el.innerHTML = '';
  const html = `<h2>${message}</h2>`;
  el.insertAdjacentHTML('beforeend', html);
};

searchClimate.addEventListener('keyup', function (e) {
  let coun = searchClimate.value;
  console.log(coun.length);
  if (coun.length) {
    fetch(`https://restcountries.com/v2/name/${coun}`)
      .then(res => {
        if (!res.ok)
          throw Error(
            'unable to find country may be you or from another world 💔 no data found for you'
          );
        return res.json();
      })
      .then(data => {
        if (!data.length)
          throw Error(
            'unable to find country may be you or from another world 💔 no data found for you'
          );

        renderCountry(data);
      })
      .catch(err => renderError(err.message, sidebarClimate));
  } else {
    renderCountry(allCountries);
  }
});

const rendercurClimate = function (country) {
  console.log(country.capital);
  let html = '';
  allCountries.forEach(coun => {
    if (coun.capital === country.capital) {
      localStorage.setItem('capital', JSON.stringify(coun.capital));
      console.log('hello');
      container.innerHTML = '';
      console.log('coming');
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${coun.capital}&appid=864552384699a2784c3c066abeedb4ca`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          html = `<div class="inner">
    <div class="weather">
      <h4 class="weather__row heading">Weather ${
        country.name
      } <span>☁</span></h4>
      <img
        src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt=""
        class="weather__row icon"
      />
      <p class="weather__row">${data.weather[0].description}</p>
    </div>
    <div class="sun">
      <h4 class="sun__row sun__heading">SUN STATS <span>☀</span></h4>
      <p class="sun__row">
        <span class="sun__value">sunrise 🌄:</span> ${getTime(data.sys.sunrise)}
      </p>
      <p class="sun__row">
        <span class="sun__value">sunset 🌇:</span>  ${getTime(data.sys.sunset)}
      </p>
    </div>
  </div>
  <div class="climate">
    <h4 class="climate__heading">Climate ☁</h4>
    <p class="climate__row">
      <span class="climate__value">Average Temperature: </span> ${
        data.main.temp
      }K
    </p>
    <p class="climate__row">
      <span class="climate__value">Maximum Temperature:</span> ${
        data.main.temp_max
      }K
    </p>
    <p class="climate__row">
      <span class="climate__value">Minimum Temperature : </span> ${
        data.main.temp_min
      }K
    </p>
    <p class="climate__row">
      <span class="climate__value">Pressure : </span>${
        data.main.pressure
      } pascal
    </p>
    <p class="climate__row">
      <span class="climate__value">Humidty :</span>${data.main.humidity}unit
    </p>
  </div>
  <div class="wind">
    <h4 class="wind__heading">WIND 💨</h4>
    <p class="wind__row"><span class="wind__value">speed : </span> ${
      data.wind.speed
    }</p>
    <p class="wind__row"><span class="wind__value">degree : </span> ${
      data.wind.deg
    }°</p>
    <p class="wind__row">
      <span class="wind__value">Visibilty : </span> ${data.visibility}
    </p>
    <a href="next5days.html" class="wind__row next">next 5 day stats</a>

  </div>`;
          container.insertAdjacentHTML('afterbegin', html);
        })
        .catch(err => renderError(err.message, container));
    }
  });
};

rendercurClimate(currentCountry);
