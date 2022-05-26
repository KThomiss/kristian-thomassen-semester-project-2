import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { searchFilter } from "../components/common/searchFilter.js";

createMenu();

const products = apiUrl + "products/";

(async function () {
  try {
    const response = await fetch(products);
    const json = await response.json();

    fetchProducts(json);
    searchFilter(json);
  } catch (error) {
    console.log(error);
  }
})();

export function fetchProducts(products) {
  const productsContainer = document.querySelector(".container__products");

  productsContainer.innerHTML = "";

  for (let i = 0; i < products.data.length; i++) {
    productsContainer.innerHTML += `<div class="content__product product__list">
                                      <a href="prodDetails.html?id=${products.data[i].id}">
                                        <img src=${products.data[i].attributes.image_url} class="product__img" alt="#" />
                                      </a>   
                                      <div class="product__info">
                                        <h3 class="product__info--title">${products.data[i].attributes.title}</h3>
                                        <p class="product__info--price">${products.data[i].attributes.price} $</p>
                                        <a href="prodDetails.html?id=${products.data[i].id}" class="product__btn cta">Shop now</a>
                                      </div>
                                    </div>`;
  }

  /*   products.forEach(function (product) {
    productsContainer.innerHTML += `<div class="content__product product__list">
                                      <a href="prodDetails.html?id=${product.id}">
                                        <img src=http://localhost:1337${product.image.formats.medium.url} class="product__img" alt="${product.image.alternativeText}" />
                                      </a>   
                                      <div class="product__info">
                                        <h3 class="product__info--title">${product.title}</h3>
                                        <p class="product__info--price">${product.price} $</p>
                                        <a href="prodDetails.html?id=${product.id}" class="product__btn cta">Shop now</a>
                                      </div>
                                    </div>`;
  }); */
}
