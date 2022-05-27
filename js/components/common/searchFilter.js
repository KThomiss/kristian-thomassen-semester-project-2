import { fetchProducts } from "../fetchProducts.js";

export function searchFilter(products) {
  const filterInput = document.querySelector("#search");
  const productsContainer = document.querySelector(".container__products");
  console.log(products);

  function inputValue(event) {
    /* console.log(products); */
    const inputValue = event.target.value.trim().toLowerCase();

    const prodArray = products.data;

    const filteredProducts = prodArray.filter(function (search) {
      if (search.attributes.title.trim().toLowerCase().includes(inputValue)) {
        return true;
      }
    });
    /* console.log(filteredProducts); */
    /* console.log(typeof filteredProducts); */
    fetchProducts(filteredProducts);

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `<div class="message">No results</div>`;
    }
  }
  filterInput.addEventListener("keyup", inputValue);
}
