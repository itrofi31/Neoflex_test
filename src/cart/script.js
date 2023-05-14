'use strict';
import headphones from '../assets/headphones.js';

let counter = 0;
let quantity = 0;
let totalSum = 0;
const countCart = document.querySelectorAll('.header__count')[1];
const cart = document.querySelector('.cart');
const totalPrice = document.querySelector('.total__price');
let cardCount, event, curSum;

//to count cards added to cart from storage
const cardsCounter = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

const cardsArr = [];

document.addEventListener('DOMContentLoaded', () => {
  setStorage();
  getStorage();

  //display cards
  for (let card of cardsArr) {
    cart.appendChild(createCard(headphones[card], cardsCounter[card]));
    quantity += +cardsCounter[card];

    updateQuantity();
    displayTotalSum();
  }

  cart.addEventListener('click', (e) => {
    if (e.target.className === 'btn--count card--minus') {
      event = e.target;

      const cardCount = e.target
        .closest('.card__count-box')
        .querySelector('.card__count');
      const currentCount = Number(cardCount.textContent);
      cardCount.textContent = currentCount - 1;
      quantity--;
      displayTotalSum();
    }
    if (e.target.className === 'btn--count card--plus') {
      event = e.target;

      const cardCount = e.target
        .closest('.card__count-box')
        .querySelector('.card__count');
      const currentCount = Number(cardCount.textContent);
      cardCount.textContent = currentCount + 1;
      quantity++;
      displayTotalSum();
    }
    if (e.target.className === 'card__trash') {
      const trashCard = e.target.closest('.card');
      const id = headphones.indexOf(
        headphones.find(
          (item) =>
            item.title ===
            trashCard.querySelector('.card__item-name').textContent
        )
      );
      quantity -= +trashCard.querySelector('.card__count').textContent;
      cardsCounter[id] -= +trashCard.querySelector('.card__count').textContent;
      if (cardsCounter[id] <= 0) {
        delete cardsCounter[id];
        cardsArr.splice(cardsArr.indexOf(id), 1);
      }
      trashCard.remove();
      updateQuantity();
      displayTotalSum();
    }
  });
});

function setStorage() {
  let curCount = sessionStorage.getItem('countCart');
  if (curCount) counter = countCart.textContent = curCount;
}

function displayTotalSum() {
  totalSum = 0;
  cardCount.forEach((card) => {
    let cardPrice = card
      .closest('.card')
      .querySelector('.card__item-price')
      .textContent.slice(0, -1);

    totalSum += +card.textContent * cardPrice;
  });
  totalPrice.textContent = totalSum;
}

function createCard(item, quantity) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <div class="card__img-box">
  <img src="${item.img}" alt="headphones" class="card__img">
  <div class="card__count-box">
    <button class="btn--count card--minus">-</button>
    <span class="card__count">1</span>
    <button class="btn--count card--plus">+</button>
  </div>
</div>
<div class="card__name-box">
  <div class="card__item-name">${item.title}</div>
  <div class="card__item-price">${item.price}₽</div>
</div>
<div class="card__total-box">
  <span class="card__trash"></span>
  <span class="card__total">${item.price}₽</span>
</div>`;
  totalSum += item.price;
  return card;
}

function getStorage() {
  for (let i = 0; i <= 6; i++) {
    if (sessionStorage.getItem(`${i}`)) {
      cardsCounter[i] = sessionStorage.getItem(`${i}`);
      cardsArr.push(i);
    }
  }
}

function updateQuantity() {
  cardCount = document.querySelectorAll('.card__count');
  cardCount.forEach((card, i) => (card.textContent = cardsCounter[i]));
  countCart.textContent = quantity;
  console.log(quantity);
}
