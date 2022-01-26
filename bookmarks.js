'use strict';
const mainContainer = document.querySelector('.container');
let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
let allCountries = JSON.parse(localStorage.getItem('allCountries'));
let countries = JSON.parse(localStorage.getItem('allCountries'));
const info = document.querySelector('.info');
const header = document.querySelector('.header');
let currentCountry;
let map;
let bordering;
let climate;
let allCountry = [];
const countryDetails = function (place) {
  info.innerHTML = '';
  console.log(place);
  let content = `
  <div class="info__left">
    <button class="back">back</button>
    <img src="${place.flags.svg}" alt="" class="flag" />
    <h4 class="info__name"><span>country : </span> ${place.name}</h4>
    <a href="map.html" class="map" target="_blank">view on map</a>
    <a href="climate.html" class="climate" target="_blank">check climate</a>
  </div>
  <div class="info__right">
    <div class="custom">
      <div class="info__right1">
        <h4 class="info__name name2">${place.name}</h4>
        <div class="population">
          <span class="bold"> Native name: </span> ${place.nativeName}
        </div>
        <div class="population">
          <span class="bold"> poupulation: </span> ${place.population} people
        </div>
        <div class="population">
          <span class="bold"> sub region: </span> ${place.subregion}
        </div>
      </div>
      <div class="info__right1">
        <div class="population huge">
          <span class="bold"> capital: </span> ${place.capital}
        </div>
        <div class="population">
          <span class="bold"> area: </span> ${place.area}
        </div>
        <div class="population">
          <span class="bold"> currencies: </span> ${place.currencies[0].name}
        </div>
      </div>
    </div>
    <h4 class="neighbourcountry">Neighbour countries:</h4>
    <div class="borders">
    
    </div>
  </div>`;
  info.insertAdjacentHTML('afterbegin', content);
  currentCountry = '';
  currentCountry = place;
  localStorage.setItem('currentCountry', JSON.stringify(currentCountry));
  let code = '';
  bordering = document.querySelector('.borders');
  map = document.querySelector('.map');
  climate = document.querySelector('.climate');
  calcLoc(place.latlng);
  localStorage.removeItem('country');
  localStorage.setItem('country', JSON.stringify(place.name));
  console.log(place.borders);
  if (place.borders.length === 0) {
    console.log('check');
    code += 'no border country';
    // bordering.innerHTML = code;
  } else {
    // countries = [];
    place.borders.forEach((bor, i) => {
      // countries.push(bor);
      allCountry.forEach(country => {
        if (country.alpha3Code === bor) {
          code += ` <button class="border__btn" data-src="${i}">${country.name}</button>`;
        }
      });
    });
    borderCountry();
  }
  bordering.insertAdjacentHTML('afterbegin', code);
  info.style.display = 'flex';
  mainContainer.style.display = 'none';
  header.style.display = 'none';

  //back button
  const back = document.querySelector('.back');
  back.addEventListener('click', function () {
    renderBookmarks(bookmarksStorage);
    info.style.display = 'none';
  });
};
let happy = function () {
  let countriesEl = document.querySelectorAll('.countries');
  // console.log(countriesEl);
  countriesEl.forEach(country => {
    country.addEventListener('click', function (e) {
      // console.log();
      e.preventDefault();
      let id = country.dataset.src;

      if (e.target.parentElement.className === 'country__right') {
        let countryName = e.target.parentElement.nextElementSibling.textContent;
        console.log(countryName);
        bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
        let bookmarks = bookmarksStorage ? bookmarksStorage : [];
        e.target.classList.remove('fas');
        e.target.classList.add('far');
        console.log(countries[id]);
        bookmarks.forEach((b, i) => {
          if (countryName === b.name) {
            console.log(countryName, b.name);
            b.bookmark = false;
            let removeID = i;
            console.log(removeID);
            bookmarks.splice(removeID, 1);
            console.log(bookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            renderBookmarks(bookmarks);
          }
        });
        return;
      }

      countryDetails(countries[id]);
    });
  });
};
const renderBookmarks = function (data, className = '') {
  let html;
  mainContainer.innerHTML = '';
  if (!data) return;
  data.forEach((item, i) => {
    // console.log(allCountries);
    allCountries.forEach(country => {
      if (item.alpha3Code === country.alpha3Code) {
        country.bookmark = true;
        console.log(item);
        item = country;
      }
    });
    // console.log(item);
    html = `  <div class="countries" data-src="${i}">
      <img class="country__img" src="${item.flags.svg}" />
      <div class="country__data">
      <div class="country__right"> 
      <i class="fa-bookmark ${item.bookmark ? 'fas' : 'far'}"></i>
      
      </div>
        <h3 class="country__name">${item.name}</h3>
        <h4 class="country__region">${item.region}</h4>
        <p class="country__row"><span>👫</span>${item.population} people</p>
        <p class="country__row"><span>🗣️</span>${item.languages[0].name}</p>
        </div>
        </div>`;
    mainContainer.insertAdjacentHTML('beforeend', html);
    // <p class="country__row"><span>💰</span>${item.currencies[0].name}</p>
  });
  happy();
};
let calcLoc = function ([lat, lng]) {
  map.addEventListener('click', function (e) {
    // e.preventDefault();
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    console.log(lat, lng);
    // console.log(map.getAttribute('href'));
    // map.setAttribute('href', `https://www.google.com/maps/@${lat},${lng},6z`);
    // countryLocationTrack(lat, lng);
    localStorage.setItem('latitude', JSON.stringify(lat));
    localStorage.setItem('longitude', JSON.stringify(lng));
  });
};
const borderCountry = function () {
  bordering.addEventListener('click', function (e) {
    if (e.target.closest('.border__btn')) {
      // console.log(e.target.closest('.border__btn'));
      const borderC = e.target.closest('.border__btn').textContent;
      console.log(borderC);
      allCountry.forEach(country => {
        if (country.name === borderC) {
          console.log(country);
          countryDetails(country);
        }
      });
    }
  });
};

renderBookmarks(bookmarksStorage);
