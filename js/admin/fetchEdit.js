import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";

createMenu();

const products = apiUrl + "products?populate=*";

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

  for (let i = 0; i < products.data.length; i++) {
    productsContainer.innerHTML += `<a href="editForm.html?id=${products.data[i].id}" class="edit__link" aria-label="icon for editing product">
                                    <div class="container__products--edit">
                                    <p class="edit__id">Id: ${products.data[i].id}</p>
                                    <p class="edit__title">${products.data[i].attributes.title}</p>
                                    <img src="${products.data[i].attributes.image.data.attributes.url}" alt="allez shoe" class="edit__img" />
                                      <i class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                  </a>`;
  }
}
