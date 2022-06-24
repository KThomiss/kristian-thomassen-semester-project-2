import createMenu from "../common/createMenu.js";
import { getFromCart } from "../../storage/storage.js";

const dropdownBtn = document.querySelector(".dropdown__btn");
const dropdownMenu = document.querySelector(".nav__dropdown");

dropdownBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("nav__dropdown--open");
});

createMenu();

export default function shopCartCounter() {
  const counter = document.querySelectorAll(".shopping__cart--counter");
  for (let i = 0; i < counter.length; i++) {
    const itemsInCart = getFromCart();
    counter[i].innerHTML = itemsInCart.length;

    if (itemsInCart.length === 0) {
      counter[i].style.display = "none";
    }
  }
}
shopCartCounter();
