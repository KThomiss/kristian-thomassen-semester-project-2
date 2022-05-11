import { fetchProducts } from "../fetchProducts.js";

export function searchFilter(products) {
  const filterInput = document.querySelector("#search");
  const productsContainer = document.querySelector(".container__products");

  function inputValue(event) {
    const inputValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (item) {
      if (item.title.trim().toLowerCase().includes(inputValue)) {
        return true;
      }
    });
    fetchProducts(filteredProducts);

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `<div class="message">No results</div>`;
    }
  }
  filterInput.addEventListener("keyup", inputValue);
}
