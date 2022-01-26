'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const mainContainer = document.querySelector('.container');
const images = document.querySelector('.images');
const search = document.querySelector('.sort__search');
const filter = document.querySelector('.sort__filter');
const info = document.querySelector('.info');
const header = document.querySelector('.header');
const sort = document.querySelector('.sort');
let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
let countries = [];
let allCountry = [];
let map;
let climate;
let bordering;
let currentCountry;
const renderCountry = function (data, className = '') {
  //ajax call country 1
  console.log(data);
  mainContainer.innerHTML = '';
  let html;
  data.forEach((item, i) => {
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
    // <p class="country__row"><span>💰</span>${item.currencies[0].name}</p>
    mainContainer.insertAdjacentHTML('beforeend', html);
  });
  mainContainer.style.opacity = 1;
  mainContainer.style.display = 'flex';
  header.style.display = 'flex';
  sort.style.display = 'flex';
};
const renderError = function (msg) {
  mainContainer.innerHTML = '';
  const text = ` <div class="error">
  <p class="error__text">${msg}</p>
</div>`;
  mainContainer.insertAdjacentHTML('beforeend', text);
  mainContainer.style.opacity = 1;
};
const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
    // err => alert(err)
  });
};

// let countries = [];
// fetch(`https://restcountries.eu/rest/v2/all`)
//   .then(res => res.json())
//   .then(data => countries.push(data))
//   .then(() => {
//     for (let i = 0; i < 1; i++) {
//       for (let j = 0; i < 1; j++) {
//         console.log(countries[i][j].name);
//         renderCountry(countries[i][j]);
//       }
//     }
//   });
// const el = new Promise(function (resolve, reject) {
//   console.log('hello');

// });
let bookmarks = bookmarksStorage ? bookmarksStorage : [];
let happy = function () {
  let countriesEl = document.querySelectorAll('.countries');
  // console.log(countriesEl);
  countriesEl.forEach(country => {
    country.addEventListener('click', function (e) {
      // console.log();
      e.preventDefault();
      let id = country.dataset.src;

      bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks = bookmarksStorage ? bookmarksStorage : [];
      if (e.target.parentElement.className === 'country__right') {
        if (e.target.className === 'fa-bookmark far') {
          e.target.classList.remove('far');
          e.target.classList.add('fas');
          countries[id].bookmark = true;
          bookmarks.push(countries[id]);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          allCountries();
        } else if (e.target.className === 'fa-bookmark fas') {
          e.target.classList.remove('fas');
          e.target.classList.add('far');
          countries[id].bookmark = false;

          bookmarks.forEach((b, i) => {
            if (countries[id].alpha3Code == b.alpha3Code) {
              let removeID = i;
              console.log(removeID);
              bookmarks.splice(removeID, 1);
              console.log(bookmarks);
            }
          });
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          allCountries();
        }
        return;
      }
      countryDetails(countries[id]);
    });
  });
};

//loc on map
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

//border countries link
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

const countryDetails = function (place) {
  info.innerHTML = '';
  console.log(place.flags.svg);
  let content = `
  <div class="info__left">
    <button class="back">back</button>
    <img src="${place.flags.png}" alt="" class="flag" />
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
          <span class="bold"> sub region: </span> ${place.region}
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
  if (!place.borders) {
    console.log('check');
    code += 'no neighbour country';
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
  sort.style.display = 'none';

  //back button
  const back = document.querySelector('.back');
  back.addEventListener('click', function () {
    allCountries();
    info.style.display = 'none';
  });
};

const allCountries = function () {
  countries = [];
  allCountry = [];
  bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarksStorage);
  fetch(`https://restcountries.com/v2/all`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(data => {
        if (bookmarksStorage) {
          bookmarksStorage.forEach(bookmarks => {
            if (bookmarks.alpha3Code === data.alpha3Code) {
              data.bookmark = true;
            }
          });
          if (!data.bookmark) data.bookmark = false;
        }
        countries.push(data);
        allCountry.push(data);
      });
      localStorage.setItem('allCountries', JSON.stringify(allCountry));
      localStorage.setItem('climate', JSON.stringify(climate));
    })
    .then(() => {
      renderCountry(countries);
    })
    .then(() => {
      happy();
    })
    .catch(err => {
      console.log(err);
      renderError(err);
    });
};
allCountries();
let random = [];

search.addEventListener('keyup', function (e) {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));

  if (search.value === '') {
    allCountries();
    return;
  }
  random = [];
  const text = search.value;
  fetch(`https://restcountries.com/v2/name/${text}`)
    .then(res => {
      console.log(res.ok);
      if (!res.ok) throw new Error('no country found');
      return res.json();
    })
    .then(datas => {
      console.log(datas);
      if (datas.status === 404) {
        throw new Error('now country found may be your from another world💔');
      }
      datas.forEach(data => {
        if (bookmarksStorage) {
          console.log('HELLO_BOOK');
          bookmarksStorage.forEach(bookmarks => {
            if (bookmarks.alpha3Code === data.alpha3Code) {
              data.bookmark = true;
            }
          });
          if (!data.bookmark) data.bookmark = false;
        }

        random.push(data);
      });
    })
    .then(() => {
      renderCountry(random);
      countries = [];
      countries = random;
      // console.log(countries);
    })
    .then(() => {
      happy();
    })
    .catch(err => {
      console.error(err);
      renderError(err.message);
    });
  // console.log(random);
});
let region = [];
filter.addEventListener('change', function () {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));

  region = [];
  // console.log(filter.value);
  if (filter.value === 'all') {
    allCountries();
  } else {
    const value = filter.value;
    fetch(`https://restcountries.com/v2/region/${value}`)
      .then(res => {
        return res.json();
      })
      .then(datas =>
        datas.forEach(data => {
          if (bookmarksStorage) {
            bookmarksStorage.forEach(bookmarks => {
              if (bookmarks.alpha3Code === data.alpha3Code) {
                data.bookmark = true;
              }
            });
            if (!data.bookmark) data.bookmark = false;
          }
          region.push(data);
          console.log(data.country);
        })
      )
      .then(() => {
        renderCountry(region);
        countries = [];
        countries = region;
      })
      .then(() => {
        happy();
      })
      .catch(err => renderError(err.message));

    // console.log(countries);
  }
});
