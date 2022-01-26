'use strict';
const sidebarCountry = document.querySelector('.sidebar__country');
let lat = JSON.parse(localStorage.getItem('latitude'));
let lng = JSON.parse(localStorage.getItem('longitude'));
let country = JSON.parse(localStorage.getItem('country'));
let currentCountry = JSON.parse(localStorage.getItem('currentCountry'));
// let climate = JSON.parse(localStorage.getItem('climate'));
// console.log(climate);
let allCountries = JSON.parse(localStorage.getItem('allCountries'));
let countriesEl;
let search = document.querySelector('.search');
// let counArr = [];

var map;
// console.log(allCountries);
// const loadClimate = function (capital) {
//   capital.forEach(cap => {
//     console.log('hello');
//   });
// };

const getWeather = async function (city) {
  try {
    let data;
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=864552384699a2784c3c066abeedb4ca`
    );
    if (!res.ok) throw Error('problem getting data');
    data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
const popupContent = async function (country) {
  try {
    let weather = await getWeather(country.capital);
    let des;
    let icon;
    if (weather.cod === '404') {
      des = 'no weather available';
      icon = 'logo.png';
    } else {
      des = weather.weather[0].description;
      icon = `http://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png`;
    }
    return ` <div  class="countries1" data-src="${country.capital}">
  <img class="country__img1" src="${country.flags.svg}" />
  <div class="country__data1">
    <h3 class="country__name1">${country.name}</h3>
    <h4 class="country__region1">${country.region}</h4>
    <p class="country__row1"><span>👫</span>${country.population} people</p>
    <p class="country__row1"><span>🗣️</span>${country.languages[0].name}</p>
    <p class="country__row1"><span>💰</span>${country.currencies[0].name}</p>
    <a href="climate.html" target= "_blank" class="country__row1 climate">
    <img src="${icon}" class="climate__link" alt="img icon" />
    <p >${des} ⏭</p>
  </a>
  </div>
</div>`;
  } catch (err) {
    return '<p>sorry cannot fetch data</p>';
  }
};
const renderMarker = async function (lat, lng) {
  let popup = await popupContent(currentCountry);
  // var popup = L.popup()
  //   .setLatLng(latlng)
  //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
  //   .openOn(map);
  map = L.map('map').setView([lat, lng], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup(popup).openPopup();
};
const renderPopup = async function (lat, lng, country) {
  let html = await popupContent(country);
  L.marker([lat, lng]).addTo(map).bindPopup(html).openPopup();
};
const renderCountryOnMap = function (coun) {
  coun.forEach(c => {
    c.addEventListener('click', function (e) {
      // let countryName = e.target.lastElementChild.innerHTML;
      // console.log(countryName);
      let closest = e.target.closest('.countries');
      let countryName = closest.children[1].textContent;
      allCountries.forEach(co => {
        if (co.name === countryName) {
          if (!co.latlng.length) {
            alert('unable to find country!');
            return;
          }
          renderPopup(co.latlng[0], co.latlng[1], co);
        }
      });
    });
  });
};

const renderCountry = function (all) {
  sidebarCountry.innerHTML = '';
  all.forEach(country => {
    const html = ` <div class="countries">
    <img src="${country.flags.svg}" class="flag" alt="" />
    <p class="country__name">${country.name}</p>
  </div>`;

    sidebarCountry.insertAdjacentHTML('beforeend', html);
  });
  countriesEl = document.querySelectorAll('.countries');
  // console.log(countriesEl);
  renderCountryOnMap(countriesEl);
};
const renderError = function (msg) {
  sidebarCountry.innerHTML = '';
  const text = ` <div class="error">
  <p class="error__text">${msg}</p>
</div>`;
  sidebarCountry.insertAdjacentHTML('beforeend', text);
};

let random = [];
search.addEventListener('keyup', function (e) {
  if (search.value === '') {
    console.log(`hey there`);
    renderCountry(allCountries);
    return;
  }
  random = [];
  const text = search.value;
  fetch(`https://restcountries.com/v2/name/${text}`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          'unable to find country may be you or from another world 💔 no data found for you'
        );
      return res.json();
    })
    .then(datas => datas.forEach(data => random.push(data)))
    .then(() => {
      renderCountry(random);
    })
    .catch(err => renderError(err.message));
});

renderCountry(allCountries);
renderMarker(lat, lng);
