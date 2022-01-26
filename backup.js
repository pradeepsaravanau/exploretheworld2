'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const mainContainer = document.querySelector('.container');
const images = document.querySelector('.images');
const renderCountry = function (data, className = '') {
  //ajax call country 1
  console.log(data[2].languages[0].name);
  for (let i = 0; i < data.length; i = i + 3) {
    let j = i;
    const html = `<div class="country__row">
    <div class="countries">
      <article class="country">
        <img class="country__img" src="${data[i].flag}" />
        <div class="country__data">
          <h3 class="country__name">${data[i].name}</h3>
          <h4 class="country__region">${data[i].region}</h4>
          <p class="country__row"><span>👫</span>${(
            data[i].population / 100000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${
            data[i].languages[0].name
          }</p>
          <p class="country__row"><span>💰</span>${
            data[i].currencies[0].name
          }</p>
        </div>
      </article>
      <article class="country">
        <img class="country__img" src="${data[i + 1].flag}" />
        <div class="country__data">
          <h3 class="country__name">${data[i + 1].name}</h3>
          <h4 class="country__region">${data[i + 1].region}</h4>
          <p class="country__row"><span>👫</span>${(
            data[i + 1].population / 100000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${
            data[i + 1].languages[0].name
          }</p>
          <p class="country__row"><span>💰</span>${
            data[i + 1].currencies[0].name
          }</p>
        </div>
      </article>
      <article class="country">
      <img class="country__img" src="${data[i + 2].flag}" />
      <div class="country__data">
        <h3 class="country__name">${data[i + 2].name}</h3>
        <h4 class="country__region">${data[i + 2].region}</h4>
        <p class="country__row"><span>👫</span>${(
          data[i + 2].population / 100000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          data[i + 2].languages[0].name
        }</p>
        <p class="country__row"><span>💰</span>${
          data[i + 2].currencies[0].name
        }</p>
      </div>
    </article>
    </div>
  </div>
      `;
    mainContainer.insertAdjacentHTML('beforeend', html);
  }

  mainContainer.style.opacity = 1;
};
const renderError = function (msg) {
  mainContainer.insertAdjacentText('beforeend', msg);
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
let countries = [];
fetch(`https://restcountries.eu/rest/v2/all`)
  .then(res => res.json())
  .then(datas => datas.forEach(data => countries.push(data)))
  .then(() => renderCountry(countries))
  .catch(err => renderError(err));
