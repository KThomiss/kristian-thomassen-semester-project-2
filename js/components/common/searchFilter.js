import { fetchProducts } from "../fetchProducts.js";

export function searchFilter(products) {
  const filterInput = document.querySelector("#search");

  function inputValue(event) {
    const inputValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (product.attributes.title.trim().toLowerCase().includes(inputValue)) {
        return true;
      }
    });
    fetchProducts(filteredProducts);
  }
  filterInput.addEventListener("keyup", inputValue);
}
