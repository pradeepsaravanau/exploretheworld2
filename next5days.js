'use strict';
let capital = JSON.parse(localStorage.getItem('capital'));
console.log(capital);
const body = document.querySelector('body');
let html = '';
const calcDate = function (time) {
  const date = new Date(time * 1000);
  const curDate = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${curDate}/${month}/${year}`;
};
const getTime = function (time) {
  const date = new Date(time * 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const curDate = date.getDate();
  const curMonth = date.getMonth();
  return `${curDate}/${curMonth} ${hour}:${minute}`;
};
const climate5days = async function (capital) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${capital}&appid=864552384699a2784c3c066abeedb4ca`
    );
    const data = await res.json();
    console.log(data);
    html = '';
    data.list.forEach((day, i) => {
      if (i === 0 || i === 7 || i === 15 || i === 23 || i === 31) {
        html += `<h5 class="day">${calcDate(day.dt)} </h5>
        <div class="container">
          <div class="inner">
            <div class="weather">
              <h4 class="weather__row heading">Weather <span>☁</span></h4>
              <img
                src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png"
                alt=""
                class="weather__row icon"
              />
              <p class="weather__row">${day.weather[0].description}</p>
            </div>
            <div class="wind">
            <h4 class="wind__heading">WIND 💨</h4>
            <p class="wind__row"><span class="wind__value">speed : </span>${
              day.wind.speed
            }</p>
            <p class="wind__row"><span class="wind__value">degree : </span> ${
              day.wind.deg
            }</p>
            <p class="wind__row">
              <span class="wind__value">gust : </span> ${day.wind.gust}
            </p>
          </div>
          </div>
          <div class="climate">
            <h4 class="climate__heading">Climate ☁</h4>
            <p class="climate__row">
              <span class="climate__value">Average Temperature: </span> ${
                day.main.temp
              }K
            </p>
            <p class="climate__row">
              <span class="climate__value">Maximum Temperature:</span> ${
                day.main.temp_max
              }K
            </p>
            <p class="climate__row">
              <span class="climate__value">Minimum Temperature : </span> ${
                day.main.temp_min
              }K
            </p>
            <p class="climate__row">
              <span class="climate__value">Pressure : </span> ${
                day.main.pressure
              }
            </p>
            <p class="climate__row">
              <span class="climate__value">Humidity :</span>${day.main.humidity}
            </p>
          </div>
       
        </div>`;
      }
    });
    body.innerHTML = '';
    body.insertAdjacentHTML('afterend', html);
  } catch (err) {
    return err;
  }
};

climate5days(capital);
