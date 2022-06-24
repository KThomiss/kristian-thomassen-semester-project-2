import createMenu from "../components/common/createMenu.js";
import { addToCart, getFromCart } from "../storage/storage.js";
import shopCartCounter from "../components/common/mobileMenu.js";

createMenu();

const clearAllBtn = document.querySelector(".cart__clearAll");
const priceContainer = document.querySelector(".container__price");
const cartContainer = document.querySelector(".container__cart");

function fetchCart() {
  const shoppingCart = getFromCart();

  cartContainer.innerHTML = "";

  if (shoppingCart.length === 0) {
    cartContainer.innerHTML = `<p class="message">Your shopping cart is empty.</p>`;
    clearAllBtn.style.display = "none";
    priceContainer.style.display = "none";
  }
  shoppingCart.forEach(function (cart) {
    cartContainer.innerHTML += `<div class="content__cart">
                                    <img src="${cart.img}" class="cart__img" alt="product image" />
                                    <h2>${cart.title}</h2>
                                    <p data-price="${cart.price}" id="price">${cart.price} $</p>
                                    <a href="prodDetails.html?id=${cart.id}" class="cta cart__view--btn">Details</a>
                                      <i class="fa-solid fa-trash-can" data-id="${cart.id}"></i> 
                                  </div>`;

    const deleteFromCart = document.querySelectorAll(".fa-trash-can");
    deleteFromCart.forEach(function (removeIcon) {
      removeIcon.addEventListener("click", removeProduct);
    });
  });
}
fetchCart();

function sumPriceOfCart() {
  const dataPrice = document.querySelectorAll("[data-price]");
  let sumPrice = 0;

  for (let i = 0; i < dataPrice.length; i++) {
    const number = dataPrice[i].dataset.price;
    sumPrice += parseFloat(number);
  }
  priceContainer.innerHTML = `<div class="content__price">Price in total = ${sumPrice} $</div>`;
}
sumPriceOfCart();

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
    sumPriceOfCart();
    shopCartCounter();
  }
}

clearAllBtn.addEventListener("click", function () {
  localStorage.removeItem("shopCart");
  clearAllBtn.style.display = "none";
  cartContainer.innerHTML = `<div class="message">Your shopping cart is empty.<div>`;
  priceContainer.innerHTML = "";
  shopCartCounter();
});
