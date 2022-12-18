import { apiUrl } from "../utils/api.js";

const featured = apiUrl + "products?populate=*";

(async function () {
  try {
    const response = await fetch(featured);
    const json = await response.json();

    fetchFeatured(json);
  } catch (error) {
    console.log(error);
  }
})();

function fetchFeatured(featured) {
  const featuredContainer = document.querySelector(".container__featured");

  featuredContainer.innerHTML = "";

  for (let i = 0; i < featured.data.length; i++) {
    if (featured.data[i].attributes.featured === true) {
      featuredContainer.innerHTML += `<div class="content__product product__featured">
                                        <a href="prodDetails.html?id=${featured.data[i].id}">
                                          <img src=${featured.data[i].attributes.image.data.attributes.url} class="product__img featured__img" alt="#" />
                                        </a>
                                        <div class="product__info">
                                          <h3>${featured.data[i].attributes.title}</h3>
                                          <p>${featured.data[i].attributes.price} $</p>
                                          <a href="prodDetails.html?id=${featured.data[i].id}" class="product__btn cta">Shop now</a>
                                        </div>
                                      </div>`;
    }
  }
}
