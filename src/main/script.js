'use strict';
import headphones from '../assets/headphones.js';

let counter = 0;
const countCart = document.querySelectorAll('.header__count')[1];
const cards = document.querySelector('.cards');
const cardsWireless = document.querySelector('#wireless');
const cardsCounter = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

document.addEventListener('DOMContentLoaded', () => {
  setStorage();

  //display cards
  headphones.forEach((item, i) => {
    if (i < 6) cards.appendChild(createCard(item));
    else cardsWireless.appendChild(createCard(item));
  });
});

//cart counter
document.querySelectorAll('.cards').forEach((card) =>
  card.addEventListener('click', (e) => {
    if (e.target.className === 'btn') {
      //put to storage
      sessionStorage.setItem(
        e.target.dataset.id,
        ++cardsCounter[e.target.dataset.id]
      );
      counter++;
      countCart.textContent = counter;
      sessionStorage.setItem('countCart', counter);
    }
  })
);

function setStorage() {
  let curCount = sessionStorage.getItem('countCart');
  if (curCount) counter = countCart.textContent = curCount;
}

function createCard(item) {
  const card = document.createElement('li');
  card.classList.add('card');
  card.innerHTML = `
  <div class="card__img-box">
    <img src="${item.img}" alt="headphones" class="card__img">
  </div>

  <div class="card__text-box">
    <p class="card__item-name">${item.title}</p>

    <div class="card__price">
      <span class="card__price--cur">${item.price}₽</span>
      <span class="card__price--old">3527₽</span>
    </div>

    <div class="card__rating-box">
      <span class="card__svg-box">
        <object class="card__svg" type="image/svg+xml" data="../assets/img/Star.svg"></object>
      </span>
      <span class="card__rating">${item.rate}</span>
    </div>

    <button class="btn" data-id="${item.id}">Купить</button>
  </div>`;
  return card;
}
