import createMenu from "../common/createMenu.js";

const dropdownBtn = document.querySelector(".dropdown__btn");
const dropdownMenu = document.querySelector(".nav__dropdown");

dropdownBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("nav__dropdown--open");
});

createMenu();
