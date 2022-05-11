import createMenu from "../components/common/createMenu.js";
import { getFromCart } from "../storage/storage.js";

createMenu();

const shoppingCart = getFromCart();
const cartContainer = document.querySelector(".container__cart");
const priceContainer = document.querySelector(".container__price");

cartContainer.innerHTML = "";

if (shoppingCart.length === 0) {
  cartContainer.innerHTML = `<p>Your shopping cart is empty.</p>`;
  priceContainer.style.display = "none";
}

shoppingCart.forEach(function (cart) {
  cartContainer.innerHTML += `<div class="content__cart">
                                <img src="${cart.img}" class="cart__img" />
                                <h3>${cart.title}</h3>
                                <p data-price="${cart.price}" id="price">${cart.price} $</p>
                              </div>`;
});

const dataPrice = document.querySelectorAll("[data-price]");

let sumPrice = 0;

for (let i = 0; i < dataPrice.length; i++) {
  const number = dataPrice[i].dataset.price;
  sumPrice += parseFloat(number);
}
priceContainer.innerHTML += `<div class="content__price">Sum price = ${sumPrice} $</div>`;
