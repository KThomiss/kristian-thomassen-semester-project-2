import createMenu from "../components/common/createMenu.js";
import { addToCart, getFromCart } from "../storage/storage.js";

createMenu();

const clearAllBtn = document.querySelector(".cart__clearAll");
const priceContainer = document.querySelector(".container__price");

function fetchCart() {
  const shoppingCart = getFromCart();
  const cartContainer = document.querySelector(".container__cart");

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
                                      <i class="fa-solid fa-trash-can" data-id="${cart.id}"></i>
                                  </div>`;

    const deleteFromCart = document.querySelectorAll(".fa-trash-can");
    deleteFromCart.forEach(function (removeIcon) {
      removeIcon.addEventListener("click", removeProduct);
    });
  });
}
fetchCart();

const dataPrice = document.querySelectorAll("[data-price]");

let sumPrice = 0;

for (let i = 0; i < dataPrice.length; i++) {
  const number = dataPrice[i].dataset.price;
  sumPrice += parseFloat(number);
  //limit to 2 decimals?
}
priceContainer.innerHTML += `<div class="content__price">Sum price = ${sumPrice} $</div>`;

function removeProduct() {
  const id = this.dataset.id;

  const shoppingCart = getFromCart();
  const prodInCart = shoppingCart.find(function (cartBtn) {
    return cartBtn.id === id;
  });

  if (prodInCart === undefined) {
    const saveSelected = {
      id: id,
    };

    shoppingCart.push(saveSelected);
    addToCart(shoppingCart);
  } else {
    const newShopCart = shoppingCart.filter(function (newCart) {
      if (newCart.id !== id) {
        return true;
      }
    });
    addToCart(newShopCart);
    fetchCart(newShopCart);
  }
}

clearAllBtn.addEventListener("click", function () {
  localStorage.clear();
  getFromCart([]);
  clearAllBtn.style.display = "none";
  cartContainer.innerHTML = `<div class="message">No favorites selected<div>`;
  priceContainer.innerHTML = "";
});
