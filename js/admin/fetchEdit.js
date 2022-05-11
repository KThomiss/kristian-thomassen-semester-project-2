import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";

createMenu();

const products = apiUrl + "products/";

(async function () {
  try {
    const response = await fetch(products);
    const json = await response.json();

    editProducts(json);
  } catch (error) {
    console.log(error);
  }
})();

function editProducts(products) {
  const productsContainer = document.querySelector(".container__edit");

  products.forEach(function (product) {
    productsContainer.innerHTML += `<div class="container__products--edit">
                                      <p class="edit__id">Id: ${product.id}</p>
                                      <p class="edit__title">${product.title}</p>
                                      <a href="editForm.html?id=${product.id}" class="edit__link"><i class="fa-solid fa-pen-to-square"></i></a>
                                    </div>`;
  });
}
